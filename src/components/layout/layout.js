import React from 'react';
import PropTypes from 'prop-types';
import layoutStyles from './layout.module.css';

// TODO: implement grid system
const Row = ({className = '', children, ...rest}) => {
  return (
    <div className={`${layoutStyles['row']} ${className}`} {...rest}>{children}</div>
  )
};

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

const Container = ({children, className = '', ...rest}) => {
  return (
    <div className={`${layoutStyles['container']} ${className}`} {...rest}>
      {children}
    </div>
  );
};

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

const Col = ({mod, children, className = '', ...rest}) => {
  return (
    <div className={`${layoutStyles[`col${mod ? `-${mod}` : ''}`]} ${className}`} {...rest}>
      {children}
    </div>
  )
};

Row.propTypes = {
  mod: PropTypes.string,
  className: PropTypes.string,
  children:PropTypes.node
};

export {
  Row,
  Container,
  Col
};
