import React from 'react';
import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import useAuth from '../../hooks/use-auth';

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
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

export default ProtectedRoute;
