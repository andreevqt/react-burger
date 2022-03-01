import React from 'react';
import classNames from 'classnames';
import layoutStyles from './col.module.css';

type TColProps = {
  className?: string;
  mod?: string | null;
  align?: 'left' | 'right' | 'center';
};

const Col: React.FC<TColProps> = ({
  className,
  mod = null,
  children,
  align
}) => {
  const classes = classNames(
    layoutStyles[`col${mod ? `-${mod}` : ''}`],
    { ...(align && { [layoutStyles[align]]: align }) },
    className
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
