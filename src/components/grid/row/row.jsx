import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import rowStyles from './row.module.css';

// TODO: implement grid system
const Row = ({
  className,
  children,
}) => (
  <div
    className={classNames(rowStyles['row'], className)}
  >
    {children}
  </div>
);

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

Row.defaultProps = {
  className: '',
};

export default Row;
