import React from 'react';
import AppHeader from '../../app-header/app-header';
import Main from '../../main/main';

const Base: React.FC = ({ children }) => (
  <>
    <AppHeader />
    <Main>
      {children}
    </Main>
  </>
);


export default Base;
