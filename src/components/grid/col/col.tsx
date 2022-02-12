import React from 'react';
import classNames from 'classnames';
import layoutStyles from './col.module.css';

const Col: React.FC<{
  className?: string;
  mod?: string | null;
  align?: 'left' | 'right' | 'center';
}> = ({
  className,
  mod = null,
  children,
  align
}) => {
    const classes = classNames(
      className,
      layoutStyles[`col${mod ? `-${mod}` : ''}`],
      { ...(align && { [layoutStyles[align]]: align }) }
    );

    return (
      <div
        className={classes}
      >
        {children}
      </div>
    );
  };

export default Col;
