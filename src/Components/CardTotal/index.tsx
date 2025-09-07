import React from 'react';

interface CardTotalProps {
    texto: string;
    valor: number;    
}
 
const CardTotal: React.FC<CardTotalProps> = ({texto, valor}) => {
    return ( 
        <div className='flex flex-col justify-between items-center text-white font-bold'>
            <label>
                {texto}
            </label>
            <label >
                {valor}    
            </label>       
        </div>
    );    
}
 
export default CardTotal;