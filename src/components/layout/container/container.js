import React from 'react';
import PropTypes from 'prop-types';
import containerStyles from './container.module.css';

const Container = ({
  className = '',
  children,
  ...rest
}) => {
  return (
    <div
      className={`${containerStyles['container']} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired
};

export default Container;
