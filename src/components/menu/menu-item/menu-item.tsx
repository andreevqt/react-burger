import React from 'react';
import classNames from 'classnames';
import { Link, useRouteMatch } from 'react-router-dom';
import menuItemStyles from './menu-item.module.css';
import { useMenu } from '../use-menu';

const MenuItem: React.FC<{
  className?: string;
  to: string;
  startIcon?: React.ReactNode;
  label: string;
}> = ({
  className,
  to,
  startIcon,
  label
}) => {
  const match = useRouteMatch({
    path: to,
    exact: true
  });

  const { direction, size } = useMenu();

  const classes = classNames(
    'pr-5 pt-4 pb-4 text',
    size === 'big' ? 'text_type_main-medium' : 'text_type_main-default',
    menuItemStyles['menu-item'],
    {
      [menuItemStyles['active']]: match,
      'pl-5': direction === 'row',
      'pr-5': direction === 'row'
    },
    className
  );

  return (
    <Link
      className={classes}
      to={to}
    >
      {
        startIcon && (
          <div className={menuItemStyles['icon']}>
            {startIcon}
          </div>
        )
      }
      {
        label
      }
    </Link>
  );
};

export default MenuItem;
