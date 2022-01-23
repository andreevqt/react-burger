import { combineReducers } from 'redux';
import ingredients from './ingredients';
import burgerConstructor from './burger-constructor';
import order from './order';
import ingredientsModal from './ingredients-modal';
import auth from './auth';
import forgotPassword from './forgot-password';

export default combineReducers({
  ingredients,
  burgerConstructor,
  order,
  ingredientsModal,
  auth,
  forgotPassword
});
