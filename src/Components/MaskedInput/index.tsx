import React, { useState, useCallback } from 'react';

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    mask: string;
    maskChar?: string;
    alwaysShowMask?: boolean;
}

const MaskedInput: React.FC<MaskedInputProps> = ({ 
    mask, 
    maskChar = '_', 
    alwaysShowMask = false,
    className = "w-full p-3 border border-gray-400 rounded-md text-xs text-blue-500 sm:text-sm sm:mb-1 md:text-md sm:mb-1 lg:text-lg lg:mb-2 xl:text-xl xl:mb-2 2xl:text-2xl 2xl:mb-3",
    value,
    onChange,
    ...props 
}) => {
    const [displayValue, setDisplayValue] = useState(value || '');

    const applyMask = useCallback((inputValue: string, maskPattern: string): string => {
        let maskedValue = '';
        let inputIndex = 0;

        for (let i = 0; i < maskPattern.length && inputIndex < inputValue.length; i++) {
            if (maskPattern[i] === '9') {
                // Aceita apenas números
                if (/\d/.test(inputValue[inputIndex])) {
                    maskedValue += inputValue[inputIndex];
                    inputIndex++;
                } else {
                    break;
                }
            } else {
                // Caractere fixo da máscara
                maskedValue += maskPattern[i];
            }
        }

        return maskedValue;
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const maskedValue = applyMask(inputValue, mask);
        
        setDisplayValue(maskedValue);
        
        if (onChange) {
            // Criar um evento sintético com o valor mascarado
            const syntheticEvent = {
                ...e,
                target: {
                    ...e.target,
                    value: maskedValue
                }
            };
            onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
        }
    }, [mask, applyMask, onChange]);

    return (
        <input
            {...props}
            value={displayValue}
            onChange={handleChange}
            className={className}
        />
    );
};

export default MaskedInput;
