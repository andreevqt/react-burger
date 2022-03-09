import { combineReducers } from 'redux';
import ingredients from './ingredients';
import burgerConstructor from './burger-constructor';
import order from './order';
import auth from './auth';
import forgotPassword from './forgot-password';
import feed from './feed';
import orderInfo from './order-info';
import history from './history';
import common from './common';

export default combineReducers({
  ingredients,
  burgerConstructor,
  order,
  auth,
  feed,
  orderInfo,
  history,
  forgotPassword,
  common
});
