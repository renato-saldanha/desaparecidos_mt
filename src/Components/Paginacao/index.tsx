import React from 'react';

interface PaginacaoProps {
    paginaAtual: number;
    totalPaginas: number;
    carregando: boolean;
    onMudarPagina: (pagina: number) => void;
}

const Paginacao: React.FC<PaginacaoProps> = ({paginaAtual, totalPaginas, carregando, onMudarPagina}) => {
    const gerarNumerosPagina = () => {
        const numeros = [];
        const maxVisiveis = 5
        
        let inicio = Math.max(1, paginaAtual - Math.floor(maxVisiveis / 2));
        const fim = Math.min(totalPaginas, inicio + maxVisiveis - 1);

        if (fim - inicio + 1 < maxVisiveis) {
            inicio = Math.max(1, fim - maxVisiveis + 1)
        }

        for (let i = inicio; i <= fim; i++) {
            numeros.push(i);
        }

        return numeros;
    }

    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            <button
                onClick={() => onMudarPagina(paginaAtual - 1)}
                disabled={paginaAtual === 1 || carregando}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Anterior
            </button>

            {gerarNumerosPagina().map((numero) => (
                <button
                    key={numero}
                    onClick={() => onMudarPagina(numero)}
                    disabled={carregando}
                    className={`px-3 py-2 border rounded-md text-sm font-medium ${
                        numero === paginaAtual
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {numero}
                </button>
            ))}

            <button
                onClick={() => onMudarPagina(paginaAtual + 1)}
                disabled={paginaAtual === totalPaginas || carregando}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Próximo
            </button>
        </div>
    )
}

export default Paginacao;