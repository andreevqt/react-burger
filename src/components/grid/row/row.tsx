import React from 'react';
import classNames from 'classnames';
import rowStyles from './row.module.css';

type TRowProps = {
  className?: string;
};

// TODO: implement grid system
const Row: React.FC<TRowProps> = ({
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
