import React from 'react';
import PropTypes from 'prop-types';
import {Container} from '../layout/layout';
import mainStyles from './main.module.css';

const Main = ({
  className = '',
  children,
  ...rest
}) => {
  return (
    <main
      className={`${mainStyles['main']} ${className}`}
      {...rest}
    >
      <Container>
        {children}
      </Container>
    </main>
  );
};

Main.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Main;
