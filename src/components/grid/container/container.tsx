import React from 'react';
import classNames from 'classnames';
import containerStyles from './container.module.css';

type TContainerProps = {
  className?: string;
};

const Container: React.FC<TContainerProps> = ({
  className,
  children
}) => (
  <div
    className={classNames(containerStyles['container'], className)}
  >
    {children}
  </div>
);

export default Container;
