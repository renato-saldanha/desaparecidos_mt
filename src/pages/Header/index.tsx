import React from 'react';
import Image from "next/image";
import Link from 'next/link';

 
class Header extends React.Component {
    constructor(props: object) {
        super(props);
    }
    render() { 
        return (  
            <header className='flex justify-between text-white text-xs items-center bg-gradient-to-r from-black to-gray-700  w-full px-9 
                               sm:text-sm sm:px-15 sm:space-x-6 
                               md:justify-center md:text-md md:space-x-40 
                               xl:justify-evenly xl:text-lg xl:space-x-120'>
                <Link
                     
                    href="/">
                    <div className='flex flex-row space-x-2 items-center justify-center'>                    
                        <Image          
                            className="transition-transform hover:scale-110 duration-300 cursor-pointer w-8 h-10
                                       sm:w-11 sm:h-13 sm:mx-4
                                       md:w-14 md:h-17 md:mx-10
                                       xl:w-13 xl:h-16 xl:mx-16" 

                            src="/policia_logo.svg"
                            alt="policia" 
                            width={50}
                            height={50} 
                            priority={true}/>
                        <div>
                            <p className='font-extrabold'>Polícia Judiciária Civil</p>
                            <p >Estado de Mato Grosso</p>
                        </div>
                    </div>
                </Link>
                <div className='flex flex-row space-x-2 items-center justify-center'>
                    <Image
                        className='w-9 h-9
                                   sm:w-10 sm:h-10 sm:mx-4
                                   md:w-12 md:h-12 md:mx-10
                                   xl:w-13 xl:h-14 xl:mx-16'
                        src="/desaparecido_logo.png"
                        alt="desaparecido"
                        width={50}
                        height={50}
                        priority={true}/>
                    <h1>Desaparecidos</h1>
                </div>
            </header>
        );
    }
}
 
export default Header;