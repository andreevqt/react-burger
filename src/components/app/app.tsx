import React, { useEffect } from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import useAuth from '../../hooks/use-auth';
import WithLoader from '../with-loader/with-loader';
import CustomSwitch from '../custom-switch/custom-switch';
import useIngredients from '../../hooks/use-ingredients';

const App: React.FC = () => {
  const { isLoading, getUser } = useAuth();
  const { getItems } = useIngredients();

  useEffect(() => {
    getUser();
    getItems();
  }, []);

  return (
    <WithLoader isLoading={isLoading}>
      <Router>
        <CustomSwitch />
      </Router>
    </WithLoader>
  );
};

export default App;
