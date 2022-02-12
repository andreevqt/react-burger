import React, { useMemo } from 'react';
import classNames from 'classnames';
import menuStyles from './menu.module.css';
import { MenuProvider } from './use-menu';

export type TMenuProps = {
  size?: 'big' | 'default';
  direction?: 'row' | 'column';
};

const Menu: React.FC<TMenuProps & {
  className?: string;
}> = ({
  className,
  children,
  direction = 'row',
  size = 'default'
}) => {
    const classes = classNames(
      { ...(direction && { [menuStyles[direction]]: direction }) },
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

export default Menu;
