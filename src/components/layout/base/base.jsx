import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from '../../app-header/app-header';
import Main from '../../main/main';

const Base = ({
  children
}) => (
  <>
    <AppHeader />
    <Main>
      {children}
    </Main>
  </>
);

Base.propTypes = {
  children: PropTypes.node
};

export default Base;
