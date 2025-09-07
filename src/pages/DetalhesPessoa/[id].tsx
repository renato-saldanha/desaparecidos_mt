import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { buscarDetalhesPessoa } from '@/services/apiService';
import { PessoaDetalhes } from '@/interfaces';


const DetalhesPessoa: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [pessoa, setPessoa] = useState<PessoaDetalhes | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

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
                {/* Header */}
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
                            pessoa.status === 'DESAPARECIDO' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-green-100 text-green-800'
                        }`}>
                            {pessoa.status === 'DESAPARECIDO' ? 'DESAPARECIDO' : 'LOCALIZADO'}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Foto */}
                    <div className="space-y-4">
                        <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                            {pessoa.foto ? (
                                <Image
                                    src={pessoa.foto}
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

                    {/* Informações */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
                            <div className="space-y-3">
                                <div>
                                    <span className="font-medium text-gray-700">Nome:</span>
                                    <p className="text-gray-900">{pessoa.nome}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Data de Nascimento:</span>
                                    <p className="text-gray-900">{pessoa.dataNascimento}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Data do Desaparecimento:</span>
                                    <p className="text-gray-900">{pessoa.dataDesaparecimento}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Local do Desaparecimento:</span>
                                    <p className="text-gray-900">{pessoa.localDesaparecimento}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">Descrição</h2>
                            <p className="text-gray-700">{pessoa.descricao}</p>
                        </div>

                        {pessoa.observacoes && (
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-xl font-semibold mb-4">Observações</h2>
                                <p className="text-gray-700">{pessoa.observacoes}</p>
                            </div>
                        )}

                        {/* Botão para enviar informações */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">Tem informações sobre esta pessoa?</h2>
                            <p className="text-gray-600 mb-4">
                                Se você tem informações sobre esta pessoa, clique no botão abaixo para enviar.
                            </p>
                            <button 
                                onClick={() => router.push(`/enviar-informacoes/${id}`)}
                                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Enviar Informações
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalhesPessoa;
