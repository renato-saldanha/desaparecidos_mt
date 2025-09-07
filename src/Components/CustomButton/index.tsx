import { ButtonHTMLAttributes } from "react";

interface CustomButtonProps {
    texto: string;
    cor: string;
}

const CustomButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement> & CustomButtonProps> = (props) => {
    return (
        <button className={`w-full ${props.cor} text-white p-2 rounded-md text-sm font-bold
                            sm:text-md 
                            md:text-lg 
                            lg:text-xl 
                            xl:text-2xl 
                            2xl:text-3xl `}
            {...props}            
        >
            {props.texto || 'Buscar'}
        </button>
    );
};

export default CustomButton;    