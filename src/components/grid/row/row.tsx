import React from 'react';
import classNames from 'classnames';
import rowStyles from './row.module.css';

// TODO: implement grid system
const Row: React.FC<{
  className?: string;
}> = ({
  className,
  children
}) => (
  <div
    className={classNames(rowStyles['row'], className)}
  >
    {children}
  </div>
);

export default Row;
