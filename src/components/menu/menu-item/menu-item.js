import React from 'react';
import PropTypes from 'prop-types';
import menuItemStyles from './menu-item.module.css'

const MenuItem = ({
  className = '',
  linkTo = '/',
  active,
  children,
  ...rest
}) => {
  return (
    <a
      className={`${menuItemStyles['menu-item']} ${active ? menuItemStyles['active'] : ''} text text_type_main-default pl-5 pr-5 pt-4 pb-4 ${className}`}
      href={linkTo}
      {...rest}
    >
      {children}
    </a>
  );
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

export default MenuItem;
