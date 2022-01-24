import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/use-auth';

const ProtectedRoute = ({ children, ...rest }) => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <Route {...rest}>
      {
        user
          ? children
          : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          )
      }
    </Route>
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node
};

export default ProtectedRoute;
