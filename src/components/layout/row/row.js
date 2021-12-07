import React from 'react';
import PropTypes from 'prop-types';
import rowStyles from './row.module.css';

// TODO: implement grid system
const Row = ({
  className = '',
  children,
  ...rest
}) => {
  return (
    <div
      className={`${rowStyles['row']} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired
};

export default Row;
