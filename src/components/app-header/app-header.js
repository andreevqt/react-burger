import React from 'react';
import Container from '../layout/container/container';
import Menu from '../menu/menu';
import MenuItem from '../menu/menu-item/menu-item';
import appHeaderStyles from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {
  return (
    <header className={`${appHeaderStyles.header} pb-4 pt-4`}>
      <Container className={appHeaderStyles.container}>
        <Menu className="flex-1 mr-auto">
          <MenuItem
            className="mr-2 pl-0"
            linkTo="/constructor"
            active
          >
            <BurgerIcon />
            Конструктор
          </MenuItem>
          <MenuItem linkTo="/feed">
            <ListIcon />
            Лента заказов
          </MenuItem>
        </Menu>
        <Logo />
        <Menu className="flex-1 ml-auto">
          <MenuItem
            className='ml-auto pr-0'
            linkTo="/feed"
          >
            <ProfileIcon />
            Личный кабинет
          </MenuItem>
        </Menu>
      </Container>
    </header>
  );
};

export default AppHeader;
