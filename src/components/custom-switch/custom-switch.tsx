import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import Home from '../../pages/home/home';
import Register from '../../pages/register/register';
import Login from '../../pages/login/login';
import ResetPassword from '../../pages/reset-password/reset-password';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import Profile from '../../pages/profile';
import NoMatch from '../../pages/no-match/no-match';
import Logout from '../../pages/logout/logout';
import Feed from '../../pages/feed/feed';
import Order from '../../pages/order/order';
import Ingredient from '../../pages/ingredient/ingredient';
import OrderInfoModal from '../../components/order-info/modal/modal';
import IngredientModal from '../ingredient-modal/ingredient-modal';
import { TState } from '../../types/history';

const CustomSwitch: React.FC = () => {
  const location = useLocation<TState>();
  const background = location.state && location.state.background;

  return (
    <>
      <Switch location={background || location}>
        <Route path="/" exact>
          <Home />
        </Route>
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
        <ProtectedRoute path="/profile">
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/logout" exact>
          <Logout />
        </ProtectedRoute>
        <Route path="/feed" exact>
          <Feed />
        </Route>
        <Route path="/feed/:id" exact>
          <Order />
        </Route>
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
      {
        background && (
          <Route path="/feed/:id" exact>
            <OrderInfoModal redirectTo="/feed" />
          </Route>
        )
      }
      {
        background && (
          <ProtectedRoute path="/profile/orders/:id" exact>
            <OrderInfoModal redirectTo="/profile/orders" />
          </ProtectedRoute>
        )
      }
    </>
  );
};

export default CustomSwitch;
