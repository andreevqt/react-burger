import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import menuStyles from './menu.module.css';
import { MenuProvider } from './useMenu';

const Menu = ({
  className,
  children,
  direction,
  size
}) => {
  const classes = classNames(
    { [menuStyles[direction]]: direction },
    menuStyles['menu'],
    className
  );

  const context = useMemo(() => ({ direction, size }), [direction, size]);

  return (
    <MenuProvider value={context}>
      <nav className={classes}>
        {children}
      </nav>
    </MenuProvider>
  );
};

Menu.propTypes = {
  className: PropTypes.string,
  direction: PropTypes.oneOf(['row', 'column']),
  size: PropTypes.oneOf(['big', 'default']),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ])
};

Menu.defaultProps = {
  className: '',
  direction: 'row',
  size: 'default'
};

export default Menu;
