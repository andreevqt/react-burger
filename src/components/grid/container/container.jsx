import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import containerStyles from './container.module.css';

const Container = ({
  className,
  children,
}) => (
  <div
    className={classNames(containerStyles['container'], className)}
  >
    {children}
  </div>
);

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

Container.defaultProps = {
  className: '',
};

export default Container;
