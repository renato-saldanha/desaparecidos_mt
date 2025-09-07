import React from 'react';
import { Menu, MenuButton, MenuItem as MenuItem, MenuItems } from '@headlessui/react';
import { TypeDropDownMenuItem } from '../../types';

interface DropDownProps {
    titulo: string;
    menus: TypeDropDownMenuItem[];
    onSelect: (item : TypeDropDownMenuItem) => void;
}
 
const DropDown: React.FC<DropDownProps> = ({titulo, menus, onSelect}) => {
        return ( 
            <Menu > 
            <MenuButton className="relative w-full p-2 inline-block text-left border border-gray-400 cursor-pointer rounded-md px-4 text-xs
                                    sm:text-sm sm:mb-1
                                    md:text-md sm:mb-1
                                    lg:text-lg lg:mb-2
                                    xl:text-xl xl:mb-2
                                    2xl:text-2xl 2xl:mb-3">
                {titulo}
            </MenuButton>
            <MenuItems 
                anchor="bottom start"
                portal={true}
                className="z-[9999] mt-1 mx-2 bg-gray-100 rounded-xl border border-gray-400 opacity-60 w-(--button-width) ">
                {menus && menus.length > 0 ? (
                    menus.map((menu, index) => (
                        <MenuItem 
                            key={index}>
                            <a className="block bg-gray-200 data-focus:bg-blue-400 font-bold cursor-pointer py-1 px-2" 
                               onClick={() => onSelect(menu)}
                            >
                                {menu.descricao}
                            </a>
                        </MenuItem>                                             
                    ))
                ) : (
                    <MenuItem>
                        <span className="z-[9999] mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200" >
                            Nenhum item disponível
                        </span>
                    </MenuItem>
                    )} 
            </MenuItems>       
        </Menu>
    );
}
 
export default DropDown;