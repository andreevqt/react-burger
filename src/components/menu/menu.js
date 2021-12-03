import React from 'react';
import PropTypes from 'prop-types';
import menuStyles from './menu.module.css';

const Menu = ({
  className = '',
  children,
  ...rest
}) => {
  return (
    <nav className={`${menuStyles['menu']} ${className}`} {...rest}>
      {children}
    </nav>
  );
};

Menu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired
};

const MenuItem = ({
  className = '',
  linkTo = '/',
  active,
  children,
  ...rest
}) => {
  return (
    <a
      className={`${menuStyles['menu-item']} ${active ? menuStyles['active'] : ''} text text_type_main-default pl-5 pr-5 pt-4 pb-4 ${className}`}
      href={linkTo}
      {...rest}
    >
      {children}
    </a>
  )
};

MenuItem.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  linkTo: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired
};

export {Menu, MenuItem};
