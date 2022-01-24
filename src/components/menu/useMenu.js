import { createContext, useContext } from 'react';

const MenuContext = createContext();

export const MenuProvider = MenuContext.Provider;

export const useMenu = () => useContext(MenuContext);
