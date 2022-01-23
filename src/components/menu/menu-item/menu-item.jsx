import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import menuItemStyles from './menu-item.module.css';
import { useMenu } from '../useMenu';

const MenuItem = ({
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

MenuItem.propTypes = {
  className: PropTypes.string,
  startIcon: PropTypes.node,
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

MenuItem.defaultProps = {
  className: ''
};

export default MenuItem;
