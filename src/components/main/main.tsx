import React from 'react';
import Container from '../grid/container/container';

type TMainProps = {
  className?: string;
};

const Main: React.FC<TMainProps> = ({
  className,
  children
}) => (
  <main
    className={className}
  >
    <Container>
      {children}
    </Container>
  </main>
);

export default Main;
