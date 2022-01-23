import React from 'react';
import PropTypes from 'prop-types';
import Container from '../grid/container/container';

const Main = ({
  className,
  children,
}) => (
  <main
    className={className}
  >
    <Container>
      {children}
    </Container>
  </main>
);

Main.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

Main.defaultProps = {
  className: '',
};

export default Main;
