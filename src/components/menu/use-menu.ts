import { createContext, useContext } from 'react';
import { TMenuProps } from './menu';

const MenuContext = createContext<TMenuProps>({});

export const MenuProvider = MenuContext.Provider;

export const useMenu = () => useContext(MenuContext);
