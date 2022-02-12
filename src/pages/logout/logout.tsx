/* eslint-disable */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/use-auth';

const Logout: React.FC = () => {
  const { logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    logout(() => history.replace({ pathname: '/login' }));
  }, []);

  return null;
};

export default Logout;
