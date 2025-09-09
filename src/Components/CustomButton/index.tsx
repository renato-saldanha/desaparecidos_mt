import { ButtonHTMLAttributes } from "react";

interface CustomButtonProps {
    texto: string;
    cor: string;
}

const CustomButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement> & CustomButtonProps> = (props) => {
    const { disabled, cor, ...restProps } = props;
    
    return (
        <button className={`w-full ${disabled ? 'bg-gray-400 cursor-not-allowed' : cor} text-white p-2 rounded-md text-sm font-bold ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                            sm:text-md 
                            md:text-lg 
                            lg:text-xl 
                            xl:text-2xl 
                            2xl:text-3xl `}
            disabled={disabled}
            {...restProps}            
        >
            {props.texto || 'Buscar'}
        </button>
    );
};

export default CustomButton;    