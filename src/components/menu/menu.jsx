import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import menuStyles from './menu.module.css';

const Menu = ({
  className,
  children,
}) => (
  <nav className={classNames(menuStyles['menu'], className)}>
    {children}
  </nav>
);

Menu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

Menu.defaultProps = {
  className: '',
};

export default Menu;
