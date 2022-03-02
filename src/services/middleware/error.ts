import { Middleware } from 'redux';
import { AUTH_ERROR } from '../actions/auth';
import { GET_ITEMS_ERROR } from '../actions/ingredients';
import { SUBMIT_ORDER_ERROR } from '../actions/order';

const error: Middleware = ({ dispatch, getState }) => (next) => (action) => {
  const state = getState();

  if (
    action.type === AUTH_ERROR
    || action.type === SUBMIT_ORDER_ERROR
    || action.type === GET_ITEMS_ERROR
  ) {
    next(action);
  }

  if (state.auth.error) {
    dispatch({ type: AUTH_ERROR, payload: null });
  } else if (state.ingredients.error) {
    dispatch({ type: GET_ITEMS_ERROR, payload: null });
  } else if (state.order.error) {
    dispatch({ type: SUBMIT_ORDER_ERROR, payload: null });
  }

  next(action);
};

export default error;
