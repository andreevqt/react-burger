import React from 'react';
import classNames from 'classnames';
import containerStyles from './container.module.css';

const Container: React.FC<{
  className?: string;
}> = ({
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
