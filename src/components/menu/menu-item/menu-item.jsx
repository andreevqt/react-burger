import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import menuItemStyles from './menu-item.module.css';

const MenuItem = ({
  className,
  to,
  active,
  children,
}) => (
  <a
    className={classNames('text text_type_main-default pl-5 pr-5 pt-4 pb-4', className, menuItemStyles['menu-item'], { [menuItemStyles['active']]: active })}
    href={to}
  >
    {children}
  </a>
);

MenuItem.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

MenuItem.defaultProps = {
  className: '',
  active: false,
};

export default MenuItem;
