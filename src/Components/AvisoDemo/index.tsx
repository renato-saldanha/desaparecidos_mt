import React from 'react';
import { MODO_DEMO } from '@/services/apiService';

const AvisoDemo: React.FC = () => {
    if (!MODO_DEMO) return null;

    return (
        <div className="w-full bg-amber-400 text-black text-center text-xs font-semibold py-0.5" role="status">
            Modo demonstração: dados fictícios
        </div>
    );
};

export default AvisoDemo;
