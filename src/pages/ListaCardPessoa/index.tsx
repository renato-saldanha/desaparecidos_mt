import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { BuscaPessoasResponse, FiltrosDTO, PessoaDTO } from '@/interfaces';
import { buscarPessoas } from '@/services/apiService';
import { useWindowSize } from '@/services/windowSize';
import Paginacao from '@/Components/Paginacao';
import CardPessoa from '@/Components/CardPessoa';

interface ListaCardPessoaProps {
    filtros: FiltrosDTO;
    onFiltrosChange: (filtros: FiltrosDTO) => void;
    onLimparFiltros: () => void;
    onBuscar: () => void;
}

const ListaCardPessoa: React.FC<ListaCardPessoaProps> = ({ 
    filtros, 
    onFiltrosChange, 
    onLimparFiltros, 
    onBuscar 
}) => {
    const { width, height } = useWindowSize();
    const router = useRouter();

    const [pessoas, setPessoas] = useState<PessoaDTO[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [totalElementos, setTotalElementos] = useState(0);
    const [carregando, setCarregando] = useState(false);

    const TAMANHO_PAGINA = 10;
    
    const getColunasPorBreakpoint = () => ({
        tablet: 2,    
        desktop: 5    
    });

    const { tablet, desktop } = getColunasPorBreakpoint();

    const pessoasAgrupadasTablet = useMemo(() => {
        try {
            const grupos = [];
            for (let i = 0; i < pessoas.length; i += tablet) {
                grupos.push(pessoas.slice(i, i + tablet));
            }
            return grupos;
        } catch (error) {
            console.error('Erro ao agrupar pessoas tablet:', error);
            return [];
        } 
    }, [pessoas, tablet]);

    const pessoasAgrupadasDesktop = useMemo(() => {
        try {
            const grupos = [];
            for (let i = 0; i < pessoas.length; i += desktop) {
                grupos.push(pessoas.slice(i, i + desktop));
            }
            return grupos;
        } catch (error) {
            console.error('Erro ao agrupar pessoas desktop:', error);
            return [];
        } 
    }, [pessoas, desktop]);

    useEffect(() => {
        const carregarPessoas = async () => {
            try {
                setCarregando(true);
                const response: BuscaPessoasResponse = await buscarPessoas(
                    paginaAtual - 1, 
                    TAMANHO_PAGINA, 
                    filtros
                );
                
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
        setPaginaAtual(novaPagina);
    };   

    const verDetalhes = (id: number) => {
        router.push(`/detalhes/${id}`);
    };

    // Função para quando os filtros mudam (chama o callback do pai)
    const handleFiltrosChange = (novosFiltros: FiltrosDTO) => {
        setPaginaAtual(1); // Reset para primeira página
        onFiltrosChange(novosFiltros);
    };

    // Função para limpar filtros (chama o callback do pai)
    const handleLimparFiltros = () => {
        setPaginaAtual(1); // Reset para primeira página
        onLimparFiltros();
    };

    // Função para buscar (chama o callback do pai)
    const handleBuscar = () => {
        setPaginaAtual(1); // Reset para primeira página
        onBuscar();
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

            {!carregando && pessoas.length > 0 && (
                <>
                    {/* TABLET: 2 colunas (640px - 1024px) */}
                    <div className="md:block">
                        <div className="grid grid-cols-2 gap-4">
                            {pessoasAgrupadasTablet.map((grupoPessoas, grupoIndex) => (
                                <div key={grupoIndex} className="contents">
                                    {grupoPessoas.map((pessoa) => (
                                        <div 
                                            key={pessoa.id}
                                            onClick={() => verDetalhes(pessoa.id)}
                                            className="cursor-pointer"
                                        >
                                            <CardPessoa pessoa={pessoa} />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* DESKTOP: 5 colunas (>= 1024px) */}
                    <div className="lg:hidden xl:block bg-white rounded-lg shadow-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="bg-white divide-y divide-gray-200">                            
                                {pessoasAgrupadasDesktop.map((grupoPessoas, grupoIndex) => (
                                    <tr key={grupoIndex}>
                                        {[...Array(desktop)].map((_, colunaIndex) => {
                                            const pessoa = grupoPessoas[colunaIndex];
                                            return (
                                                <td 
                                                    key={colunaIndex} 
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
                </>
            )}

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