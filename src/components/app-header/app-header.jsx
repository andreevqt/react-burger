import React from 'react';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Container from '../grid/container/container';
import Menu from '../menu/menu';
import MenuItem from '../menu/menu-item/menu-item';
import Notice from '../notice/notice';
import appHeaderStyles from './app-header.module.css';
import useAuth from '../../hooks/use-auth';
import useError from '../../hooks/use-error';

const AppHeader = () => {
  const { user } = useAuth();
  const { error, clearError } = useError();

  return (
    <header className={classNames(appHeaderStyles['header'], 'pb-4 pt-4')}>
      <Container className={appHeaderStyles['container']}>
        <Menu className="mr-auto">
          {user && (
            <>
              <MenuItem
                startIcon={<BurgerIcon />}
                className="mr-2 pl-0"
                label="Конструктор"
                to="/"
              />
              <MenuItem
                startIcon={<ListIcon />}
                label="Лента заказов"
                to="/feed"
              />
            </>
          )}
        </Menu>
        <Link to="/">
          <Logo />
        </Link>
        <Menu className="ml-auto">
          {user ? (
            <MenuItem
              startIcon={<ProfileIcon />}
              className="ml-auto pr-0"
              label="Личный кабинет"
              to="/profile"
            />
          ) : (
            <MenuItem
              startIcon={<ProfileIcon />}
              className="ml-auto pr-0"
              label="Вход"
              to="/login"
            />
          )}
        </Menu>
      </Container>
      {error && <Notice onClose={clearError} text={error} />}
    </header>
  );
};

export default AppHeader;
