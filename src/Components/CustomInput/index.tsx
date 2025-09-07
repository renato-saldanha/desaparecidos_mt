import React from 'react';

const CustomInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
    return ( 
        <input className="w-full p-3 border border-gray-400 rounded-md text-xs text-blue
                          sm:text-sm sm:mb-1
                          md:text-md sm:mb-1
                          lg:text-lg lg:mb-2
                          xl:text-xl xl:mb-2
                          2xl:text-2xl 2xl:mb-3"       
            {...props}
        />
     );
}

 
export default CustomInput;