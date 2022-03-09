import api from '../api';
import { AppThunk } from '../store';
import { reset } from './burger-constructor';
import { clearCount } from './ingredients';
import { setLastError } from './common';
import {
  SUBMIT_ORDER_ERROR,
  SUBMIT_ORDER_FULFILLED,
  SUBMIT_ORDER_PENDING,
  CLEAR_ORDER,
  TOrder,
  TSubmitOrderClearAction,
  TSubmitOrderErrorAction,
  TSubmitOrderFulfilledAction,
  TSubmitOrderPendingAction
} from '../action-types/order'

export const setOrder = (order: TOrder): TSubmitOrderFulfilledAction => ({
  type: SUBMIT_ORDER_FULFILLED,
  payload: order
});

export const setError = (): TSubmitOrderErrorAction => ({
  type: SUBMIT_ORDER_ERROR,
});

export const setLoading = (): TSubmitOrderPendingAction => ({
  type: SUBMIT_ORDER_PENDING
});

export const clearOrder = (): TSubmitOrderClearAction => ({
  type: CLEAR_ORDER
});

export const submitOrder: AppThunk = () => async (dispatch, getState) => {
  const { burgerConstructor: { bun, items }, order: { isLoading } } = getState();
  if (isLoading || !bun) {
    return;
  }

  const { user } = getState().auth;
  if (!user) {
    return;
  }

  dispatch(setLoading());

  const ingredients = [...items.map((item) => item._id), bun._id, bun._id];
  try {
    const result = await api.order.create(ingredients);
    dispatch(setOrder({ name: result.name, id: result.order.number }));
    dispatch(reset());
    dispatch(clearCount());
  } catch (err: any) {
    dispatch(setLastError(err));
    dispatch(setError());
  }
};
