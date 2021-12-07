import React from 'react';
import PropTypes from 'prop-types';
import Container from '../layout/container/container';

const Main = ({
  className = '',
  children,
  ...rest
}) => {
  return (
    <main
      className={className}
      {...rest}
    >
      <Container>
        {children}
      </Container>
    </main>
  );
};

Main.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default Main;
