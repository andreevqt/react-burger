import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import layoutStyles from './col.module.css';

const Col = ({
  className,
  mod,
  children,
  align
}) => {
  const classes = classNames(
    className,
    layoutStyles[`col${mod ? `-${mod}` : ''}`],
    { [layoutStyles[align]]: align }
  );

  return (
    <div
      className={classes}
    >
      {children}
    </div>
  );
};

Col.propTypes = {
  align: PropTypes.oneOf(['left', 'right', 'center', undefined]),
  mod: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ])
};

Col.defaultProps = {
  className: '',
  mod: null,
};

export default Col;
