// src/Components/CardPessoa/index.tsx
import React from 'react';
import Image from 'next/image';
import { PessoaDTO } from '@/interfaces';
import { pessoaLocalizada, formatarData, obterCorStatus, truncarNome } from '@/utils/pessoaUtils';

interface CardPessoaProps {
    pessoa: PessoaDTO;
}

const CardPessoa: React.FC<CardPessoaProps> = ({ pessoa }) => {
    const dataPessoaLocalizada = pessoaLocalizada(pessoa);
    const corStatus = obterCorStatus(pessoa);

    
    return (
        <div className="flex flex-col items-center p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-full h-auto min-h-[200px] sm:min-h-[220px] md:min-h-[240px]">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-2">
                <Image
                    src={pessoa.urlFoto || ''}
                    alt={pessoa.nome}
                    fill
                    className="rounded-full object-cover"
                    unoptimized={true}
                    priority={true}
                />
            </div>
            
            <h1 className="text-xs sm:text-sm md:text-base font-bold text-center mb-1 truncate max-w-full px-1" title={pessoa.nome}>
                {truncarNome(pessoa.nome)}
            </h1>
            
            <div className="text-xs sm:text-sm text-gray-600 text-center space-y-1">
                <p>Idade: {pessoa.idade}</p>
                <p>Sexo: {pessoa.sexo}</p>
                <p className={`font-semibold ${corStatus} flex flex-row items-center justify-center`}>
                    {dataPessoaLocalizada? 
                        'Encontrado em: ' + formatarData(pessoa.ultimaOcorrencia.dataLocalizacao) : 
                        'Desaparecido em: ' + formatarData(pessoa.ultimaOcorrencia?.dtDesaparecimento)}
                                      
                </p>
                
                {pessoa.ultimaOcorrencia?.localDesaparecimentoConcat && (
                    <p className="text-xs">Local: {pessoa.ultimaOcorrencia.localDesaparecimentoConcat}</p>
                )}
            </div>
        </div>
    );
};

export default CardPessoa;