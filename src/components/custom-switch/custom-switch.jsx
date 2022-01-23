import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import Home from '../../pages/home/home';
import Register from '../../pages/register/register';
import Login from '../../pages/login/login';
import ResetPassword from '../../pages/reset-password/reset-password';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import Profile from '../../pages/profile/profile';
import NoMatch from '../../pages/no-match/no-match';
import Logout from '../../pages/logout/logout';
import Ingredient from '../../pages/ingredient/ingredient';
import IngredientModal from '../ingredient-modal/ingredient-modal';

const CustomSwitch = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Switch location={background || location}>
        <ProtectedRoute path="/" exact>
          <Home />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact>
          <Ingredient />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPassword />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>
        <ProtectedRoute path="/profile" exact>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/logout" exact>
          <Logout />
        </ProtectedRoute>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
      {
        background && (
          <Route path="/ingredients/:id" exact>
            <IngredientModal />
          </Route>
        )
      }
    </>
  );
};

export default CustomSwitch;
