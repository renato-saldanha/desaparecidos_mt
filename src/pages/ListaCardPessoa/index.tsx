import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { BuscaPessoasResponse, FiltrosDTO, PessoaDTO } from '@/interfaces';
import Paginacao from '@/Components/Paginacao';
import CardPessoa from '@/Components/CardPessoa';

import { buscarPessoas } from '@/services/apiService';
import { useWindowSize } from '@/hooks/useWindowSize';

interface ListaCardPessoaProps {
    filtros: FiltrosDTO;
}

const ListaCardPessoa: React.FC<ListaCardPessoaProps> = ({ 
    filtros
}) => {
    const { width } = useWindowSize();
    const router = useRouter();

    const [pessoas, setPessoas] = useState<PessoaDTO[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [totalElementos, setTotalElementos] = useState(0);
    const [carregando, setCarregando] = useState(false);

    const TAMANHO_PAGINA = 10;
    
    const getColunasPorLargura = () => {
        if (width < 640) return 1;      // Mobile
        if (width < 1024) return 2;     // Tablet
        return 5;                       // Desktop
    };

    const colunasAtuais = getColunasPorLargura();
    
    console.log('Largura da tela:', width, 'Colunas:', colunasAtuais);
    
    const pessoasAgrupadas = useMemo(() => {
        try {
            const grupos = [];
            for (let i = 0; i < pessoas.length; i += colunasAtuais) {
                grupos.push(pessoas.slice(i, i + colunasAtuais));
            }
            return grupos;
        } catch (error) {
            console.error('Erro ao agrupar pessoas:', error);
            return [];
        } 
    }, [pessoas, colunasAtuais]);

    useEffect(() => {
        const carregarPessoas = async () => {
            try {
                setCarregando(true);
                console.log('Carregando página:', paginaAtual, 'Filtros:', filtros);
                
                const response: BuscaPessoasResponse = await buscarPessoas(
                    paginaAtual - 1, 
                    TAMANHO_PAGINA, 
                    filtros
                );
                
                console.log('Resposta da API:', response);
                
                setPessoas(response.content);
                setTotalPaginas(response.totalPages);
                setTotalElementos(response.totalElements);
                
            } catch (error) {
                console.error('Erro ao carregar pessoas:', error);            
            } finally {
                setCarregando(false);
            }     
        }

        carregarPessoas();       
    }, [paginaAtual, filtros]);

    const handlePageChange = (novaPagina: number) => {
        console.log('Mudando para página:', novaPagina);
        setPaginaAtual(novaPagina);
    };   

    const verDetalhes = (id: number) => {
        router.push(`/DetalhesPessoa/${id}`);
    };

    const renderLayout = () => {
        if (pessoas.length <= 5) {
            return (
                <div className="space-y-4">
                    {pessoas.map((pessoa) => (
                        <div 
                            key={pessoa.id}
                            onClick={() => verDetalhes(pessoa.id)}
                            className="w-full cursor-pointer hover:shadow-lg transition-shadow"
                        >
                            <CardPessoa pessoa={pessoa} />
                        </div>
                    ))}
                </div>
            );
        }
        if (width < 640) {
            return (
                <div className="space-y-4">
                    {pessoas.map((pessoa) => (
                        <div 
                            key={pessoa.id}
                            onClick={() => verDetalhes(pessoa.id)}
                            className="w-full cursor-pointer hover:shadow-lg transition-shadow"
                        >
                            <CardPessoa pessoa={pessoa} />
                        </div>
                    ))}
                </div>
            );
        } else if (width < 1024) {
            return (
                <div className="grid grid-cols-2 gap-4">
                    {pessoasAgrupadas.map((grupo, index) => (
                        <div key={index} className="contents">
                            {grupo.map((pessoa) => (
                                <div 
                                    key={pessoa.id}
                                    onClick={() => verDetalhes(pessoa.id)}
                                    className="cursor-pointer hover:shadow-lg transition-shadow"
                                >
                                    <CardPessoa pessoa={pessoa} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pessoasAgrupadas.map((grupo, index) => (
                                <tr key={index}>
                                    {[...Array(colunasAtuais)].map((_, colIndex) => {
                                        const pessoa = grupo[colIndex];
                                        return (
                                            <td 
                                                key={colIndex} 
                                                className="px-2 py-4 whitespace-nowrap border-r border-gray-200 last:border-r-0"
                                            >
                                                {pessoa ? (
                                                    <div 
                                                        onClick={() => verDetalhes(pessoa.id)}
                                                        className="cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
                                                    >
                                                        <CardPessoa pessoa={pessoa} />
                                                    </div>
                                                ) : (
                                                    <div className="p-2 h-32">
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    };

    return (
        <div className='w-full'>
            <div className="mb-4 text-sm text-white">
                Mostrando {pessoas.length} de {totalElementos} registros
                {totalPaginas > 1 && (
                    <span> - Página {paginaAtual} de {totalPaginas}</span>
                )}
            </div>
            
            {carregando && (
                <div className='flex justify-center items-center mt-40'>
                    <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-white'></div>
                    <span className="ml-3 text-white">Carregando...</span>
                </div>
            )}

            {!carregando && pessoas.length === 0 && (
                <div className='flex justify-center items-center mt-40'>
                    <p className="text-white">Nenhuma pessoa encontrada</p>
                </div>
            )}

            {!carregando && pessoas.length > 0 && renderLayout()}

            {totalPaginas > 1 && (
                <div className="mt-6">
                    <Paginacao
                        paginaAtual={paginaAtual}
                        totalPaginas={totalPaginas}
                        onMudarPagina={handlePageChange}
                        carregando={carregando}
                    />
                </div>
            )}
        </div>
    );
};

export default ListaCardPessoa;