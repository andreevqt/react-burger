import api, { TError } from '../api';
import { AppThunk } from '../store';
import { reset } from './burger-constructor';

export const SUBMIT_ORDER_PENDING: 'SUBMIT_ORDER_PENDING' = 'SUBMIT_ORDER_PENDING';
export const SUBMIT_ORDER_FULFILLED: 'SUBMIT_ORDER_FULFILLED' = 'SUBMIT_ORDER_FULFILLED';
export const SUBMIT_ORDER_ERROR: 'SUBMIT_ORDER_ERROR' = 'SUBMIT_ORDER_ERROR';
export const CLEAR_ORDER: 'CLEAR_ORDER' = 'CLEAR_ORDER';

export type TOrder = {
  name: string;
  id: number;
};

export type TSubmitOrderPendingAction = {
  readonly type: typeof SUBMIT_ORDER_PENDING;
};

export type TSubmitOrderErrorAction = {
  readonly type: typeof SUBMIT_ORDER_ERROR;
  payload: TError | undefined;
};

export type TSubmitOrderFulfilledAction = {
  readonly type: typeof SUBMIT_ORDER_FULFILLED;
  payload: TOrder;
};

export type TSubmitOrderClearAction = {
  readonly type: typeof CLEAR_ORDER;
};

export type TOrderActions =
  | TSubmitOrderPendingAction
  | TSubmitOrderFulfilledAction
  | TSubmitOrderErrorAction
  | TSubmitOrderClearAction;

export const setOrder = (order: TOrder): TSubmitOrderFulfilledAction => ({
  type: SUBMIT_ORDER_FULFILLED,
  payload: order
});

export const setError = (err: TError | undefined): TSubmitOrderErrorAction => ({
  type: SUBMIT_ORDER_ERROR,
  payload: err
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
  } catch (err: any) {
    dispatch(setError(err.message));
  }
};
