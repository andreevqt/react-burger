import { combineReducers } from 'redux';
import ingredients from './ingredients';
import burgerConstructor from './burger-constructor';
import order from './order';

export default combineReducers({
  ingredients,
  burgerConstructor,
  order,
});
