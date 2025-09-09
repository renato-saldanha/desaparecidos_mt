import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { buscarDetalhesPessoa, buscarOcorrencias, enviarInformacoesAPI } from '@/services/apiService';
import { OcorrenciaInformacaoDTO, PessoaDTO } from '@/interfaces';
import { pessoaLocalizada, validarData } from '@/utils/pessoaUtils';
import CustomInput from '@/Components/CustomInput';
import CustomButton from '@/Components/CustomButton';
import { InputMask } from '@react-input/mask';


const DetalhesPessoa: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [pessoa, setPessoa] = useState<PessoaDTO | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const dataPessoaLocalizada = pessoaLocalizada(pessoa as PessoaDTO);
    const [enviarInformacoes, setEnviarInformacoes] = useState(false);
    const [ocorrencias, setOcorrencias] = useState<OcorrenciaInformacaoDTO[]>([]);
    const [formulario, setFormulario] = useState({
        informacao: '',
        descricao: '',
        data: '',
        localizacao: '',
        telefone: '',
        files: [] as File[]
    });
    const [enviando, setEnviando] = useState(false);
    const [erroFormulario, setErroFormulario] = useState<string | null>(null);
    const edtInformacoesRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const buscarPessoaDetalhes = async () => {
            try {
                setCarregando(true);
                const pess = await buscarDetalhesPessoa(Number(id));
                if (pess) {
                    setPessoa(pess);
                }
            } catch (error) {
                console.error('Erro ao buscar detalhes:', error);
                setErro('Erro ao carregar detalhes da pessoa');
            } finally {
                setCarregando(false);
            }
        };
    
        if (id) {
            buscarPessoaDetalhes();
        }
    }, [id]);

    useEffect(() => {
        const buscarOcorrenciasPessoa = async () => {
            if (!pessoa) return;
            
            try {
                const ocorrencias: OcorrenciaInformacaoDTO[] = await buscarOcorrencias(pessoa);
                setOcorrencias(ocorrencias);
            } catch (error) {
                console.error('Erro ao buscar ocorrências:', error);
                setErro('Erro ao carregar ocorrências da pessoa');
            }
        };

        if (pessoa) {
            buscarOcorrenciasPessoa();
        }
    }, [pessoa]);

    const abrirFormulario = useCallback(() => {
        setEnviarInformacoes(true);
        setErroFormulario(null);
        
        setTimeout(() => {
            const inputElement = edtInformacoesRef.current;
            if (inputElement) {
                try {
                    inputElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'nearest'
                    });
                    
                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    
                    if (isMobile) {
                        setTimeout(() => {
                            if (inputElement) {
                                inputElement.click();
                                inputElement.focus();
                            }
                        }, 300);
                    } else {                    
                        inputElement.focus();
                    }
                } catch (error) {
                    console.warn('Erro ao focar no input:', error);
                }
            }
        }, 100);
    }, []);

    const validarFormularioCompleto = useCallback(() => {
        return formulario.informacao.trim() !== '' &&
               formulario.descricao.trim() !== '' &&
               formulario.data.trim() !== '' &&
               formulario.localizacao.trim() !== '' &&
               !erroFormulario;
    }, [formulario, erroFormulario]);

    const handleInputChange = useCallback((campo: string, valor: string | File[]) => {
        if (campo === 'data' && typeof valor === 'string') {
            const erroValidacao = validarData(valor);
            if (erroValidacao) {
                setErroFormulario(erroValidacao);
                return;
            }
        }
        
        setFormulario(prev => ({
            ...prev,
            [campo]: valor
        }));
        
        if (erroFormulario) {
            setErroFormulario(null);
        }
    }, [erroFormulario]);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const fileArray = Array.from(files);
            
            
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            const invalidFiles = fileArray.filter(file => !validTypes.includes(file.type));
            
            if (invalidFiles.length > 0) {
                setErroFormulario('Apenas arquivos de imagem são permitidos (JPG, PNG, GIF, WebP)');
                return;
            }
            
            
            const maxSize = 5 * 1024 * 1024; // 5MB
            const oversizedFiles = fileArray.filter(file => file.size > maxSize);
            
            if (oversizedFiles.length > 0) {
                setErroFormulario('Cada arquivo deve ter no máximo 5MB');
                return;
            }
            
            
            if (fileArray.length > 5) {
                setErroFormulario('Máximo de 5 arquivos por envio');
                return;
            }
            
            handleInputChange('files', fileArray);
            setErroFormulario(null);
        }
    }, [handleInputChange]);

    const limparFormulario = useCallback(() => {
        setFormulario({
            informacao: '',
            descricao: '',
            data: '',
            localizacao: '',
            telefone: '',
            files: []
        });
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErroFormulario(null);
        
        if (!pessoa) {
            setErroFormulario('Erro: Pessoa não encontrada.');
            return;
        }
        
        if (!formulario.informacao.trim()) {
            setErroFormulario('Por favor, preencha as informações sobre a visualização.');
            return;
        }
        
        if (!formulario.descricao.trim()) {
            setErroFormulario('Por favor, preencha a descrição do anexo.');
            return;
        }
        
        if (!formulario.data) {
            setErroFormulario('Por favor, selecione a data da visualização.');
            return;
        }
        
        if (!formulario.localizacao.trim()) {
            setErroFormulario('Por favor, informe a localização onde a pessoa foi avistada.');
            return;
        }

        try {
            setEnviando(true);
            await enviarInformacoesAPI(pessoa.ultimaOcorrencia.ocoId, {
                informacao: formulario.informacao.trim(),
                descricao: formulario.descricao.trim(),
                data: formulario.data,
                localizacao: formulario.localizacao.trim(),
                telefone: formulario.telefone.trim(),
                files: formulario.files
            });
            
            limparFormulario();
            setEnviarInformacoes(false);
            setErroFormulario(null);
            
            const successMessage = document.createElement('div');
            successMessage.className = 'fixed top-4 right-4 bg-verde-sucesso text-white px-6 py-3 rounded-lg shadow-policia-hover z-50';
            successMessage.textContent = 'Informações enviadas com sucesso!';
            document.body.appendChild(successMessage);
            
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 3000);
            
        } catch (error: unknown) {
            console.error('Erro ao enviar informações:', error);
            
            let mensagemErro = 'Erro ao enviar informações. Tente novamente.';
            
            if (error && typeof error === 'object') {
                const axiosError = error as { response?: { status?: number }; code?: string; message?: string };
                
                if (axiosError.response?.status === 500) {
                    mensagemErro = 'Erro interno do servidor. Tente novamente em alguns minutos.';
                } else if (axiosError.response?.status === 400) {
                    mensagemErro = 'Dados inválidos. Verifique os campos preenchidos.';
                } else if (axiosError.code === 'NETWORK_ERROR' || !navigator.onLine) {
                    mensagemErro = 'Sem conexão com a internet. Verifique sua rede.';
                } else if (axiosError.message?.includes('timeout')) {
                    mensagemErro = 'Tempo limite excedido. Tente novamente.';
                }
            }
            
            setErroFormulario(mensagemErro);
        } finally {
            setEnviando(false);
        }
    };    

    if (carregando) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Carregando detalhes...</p>
                </div>
            </div>
        );
    }

    if (erro || !pessoa) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-xl">{erro || 'Pessoa não encontrada'}</p>
                    <button 
                        onClick={() => router.back()}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Voltar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-6">
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Voltar
                    </button>
                    
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">{pessoa.nome}</h1>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                            !dataPessoaLocalizada 
                                ? 'bg-status-desaparecido text-white' 
                                : 'bg-status-encontrado text-white'
                        }`}>
                            {dataPessoaLocalizada ? 'Encontrado!' : 'Desaparecido'}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                            {pessoa.urlFoto ? (
                                <Image
                                    src={pessoa.urlFoto}
                                    alt={pessoa.nome}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4 text-preto">Informações Pessoais</h2>
                            <div className="space-y-3">
                                <div>
                                    <span className="font-medium text-gray-700">Nome:</span>
                                    <p className="text-gray-900 font-bold">{pessoa.nome}</p>
                                </div>
                                <div className="text-gray-900 font-bold">
                                    {dataPessoaLocalizada ? 'Encontrado!' : 'Desaparecido'}                                    
                                </div>
                                <div>
                                    <p className="text-gray-900">Local do Desaparecimento: {pessoa.ultimaOcorrencia?.localDesaparecimentoConcat}</p>
                                </div>
                                <div>
                                    {ocorrencias.length > 0 && ocorrencias[0]?.informacao && (
                                        <p className="text-gray-900">Ocorrência: {ocorrencias[0].informacao}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4 text-preto">Tem informações sobre esta pessoa?</h2> 
                            <p className="text-gray-600 mb-4 text-black">
                                Se você tem informações sobre esta pessoa, clique no botão abaixo para enviar.
                            </p>
                            <CustomButton 
                                texto="Enviar Informações"
                                cor="bg-azul"
                                onClick={abrirFormulario}
                            >
                                Enviar Informações
                            </CustomButton>
                        </div>
                    </div>
                </div>

                {enviarInformacoes && (
                    <div className="bg-white p-6 rounded-lg shadow mt-8">
                        <div className="flex justify-end mb-4">
                            <button 
                                className="flex justify-center items-center cursor-pointer font-bold text-white  bg-vermelho-alerta p-1 rounded-md w-8 h-8 hover:bg-red-700 transition-colors" 
                                onClick={() => {
                                    setEnviarInformacoes(false);
                                    setErroFormulario(null);
                                    limparFormulario();
                                }}
                            >
                                X
                            </button>
                        </div>
                        <h2 className="text-xl font-semibold mb-4 text-preto">Enviar Informações</h2>
                        <p className="text-gray-600 mb-4">
                            Se você tem informações sobre esta pessoa, preencha o formulário abaixo.
                        </p>
                        
                        {erroFormulario && (
                            <div className="mb-4 p-4 bg-red-50 border border-vermelho-alerta text-red-800 rounded-lg shadow-policia items-center justify-center">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {erroFormulario}
                                </div>
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Informações sobre a visualização *
                                </label>
                                <input 
                                    ref={edtInformacoesRef}
                                    type="text"
                                    value={formulario.informacao}
                                    onChange={(e) => handleInputChange('informacao', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-preto"
                                    placeholder="Descreva onde e como você viu esta pessoa..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Descrição do anexo *
                                </label>
                                <CustomInput 
                                    type="text"
                                    value={formulario.descricao}
                                    onChange={(e) => handleInputChange('descricao', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-preto"
                                    placeholder="Ex: Foto de João da Silva"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Data da visualização *
                                </label>
                                <InputMask 
                                    mask="__/__/____"
                                    replacement={{ _: /\d/ }}
                                    type="text"
                                    placeholder="DD/MM/AAAA"
                                    value={formulario.data}
                                    onChange={(e) => handleInputChange('data', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-preto"
                                    inputMode="numeric"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Localização onde foi avistado(a) *
                                </label>
                                <CustomInput 
                                    type="text"
                                    value={formulario.localizacao}
                                    onChange={(e) => handleInputChange('localizacao', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-preto"
                                    placeholder="Ex: Rua das Flores, 123, Centro, Cuiabá-MT"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Telefone para contato (opcional)
                                </label>
                                <InputMask 
                                    mask="(__) _____-____"
                                    replacement={{ _: /\d/ }}
                                    placeholder="(XX) XXXXX-XXXX"
                                    value={formulario.telefone}
                                    onChange={(e) => handleInputChange('telefone', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-preto"
                                    inputMode="tel"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Fotos (opcional)
                                </label>
                                <input 
                                    key={`files-${formulario.files.length}`}
                                    type="file"
                                    multiple
                                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                    onChange={handleFileChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-preto"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Máximo 5 arquivos, 5MB cada. Formatos: JPG, PNG, GIF, WebP
                                </p>
                                
                                {formulario.files.length > 0 && (
                                    <div className="mt-3">
                                        <p className="text-sm font-medium text-gray-700 mb-2">
                                            Arquivos selecionados ({formulario.files.length}):
                                        </p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {formulario.files.map((file, index) => (
                                                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                                                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-xs text-gray-600 truncate">
                                                        {file.name}
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        ({(file.size / 1024 / 1024).toFixed(1)}MB)
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <CustomButton 
                                    texto={enviando ? "Enviando..." : "Enviar Informações"}
                                    cor="bg-azul"
                                    type="submit"
                                    disabled={enviando || !validarFormularioCompleto()}
                                />
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetalhesPessoa;
