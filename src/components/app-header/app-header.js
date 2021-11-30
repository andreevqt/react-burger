import React from 'react';
import {Container} from '../layout/layout'
import {Menu, MenuItem} from '../menu/menu';
import appHeaderStyles from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {
  return (
    <header className={`${appHeaderStyles.header} pb-4 pt-4`}>
      <Container className={appHeaderStyles.container}>
        <Menu className="flex-1 mr-auto">
          <MenuItem linkTo="/constructor" className="mr-2 pl-0" active>
            <BurgerIcon />
            <span className="ml-2">
              Конструктор
            </span>
          </MenuItem>
          <MenuItem linkTo="/feed">
            <ListIcon />
            <span className="ml-2">
              Лента заказов
            </span>
          </MenuItem>
        </Menu>
        <Logo />
        <Menu className="flex-1 ml-auto">
          <MenuItem linkTo="/feed" className='ml-auto pr-0'>
            <ProfileIcon />
            <span className="ml-2">
              Личный кабинет
            </span>
          </MenuItem>
        </Menu>
      </Container>
    </header>
  )
}

export default AppHeader;
