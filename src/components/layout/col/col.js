import React from 'react';
import PropTypes from 'prop-types';
import layoutStyles from './col.module.css';

const Col = ({
  className = '',
  mod,
  children,
  ...rest
}) => {
  return (
    <div
      className={`${layoutStyles[`col${mod ? `-${mod}` : ''}`]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

Col.propTypes = {
  mod: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired
};

export default Col;
