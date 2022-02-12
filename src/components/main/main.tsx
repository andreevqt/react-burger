import React from 'react';
import Container from '../grid/container/container';

const Main: React.FC<{
  className?: string;
}> = ({
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
