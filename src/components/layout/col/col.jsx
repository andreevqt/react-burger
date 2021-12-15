import React from 'react';
import PropTypes from 'prop-types';
import layoutStyles from './col.module.css';

const Col = ({
  className,
  mod,
  children,
}) => (
  <div
    className={`${layoutStyles[`col${mod ? `-${mod}` : ''}`]} ${className}`}
  >
    {children}
  </div>
);

Col.propTypes = {
  mod: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

Col.defaultProps = {
  className: '',
  mod: null,
};

export default Col;
