import React, { useEffect } from 'react';
import {
  Router
} from 'react-router-dom';
import useAuth from '../../hooks/use-auth';
import WithLoader from '../with-loader/with-loader';
import history from '../../services/history/history';
import CustomSwitch from '../custom-switch/custom-switch';

const App = () => {
  const { isLoading, getUser } = useAuth();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <WithLoader isLoading={isLoading}>
      <Router history={history}>
        <CustomSwitch />
      </Router>
    </WithLoader>
  );
};

export default App;
