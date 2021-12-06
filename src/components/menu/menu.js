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

export default Menu;
