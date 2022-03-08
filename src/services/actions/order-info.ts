import api, { TOrder } from '../api';
import { AppThunk } from '../store';
import { setLastError } from './common';

export const ORDER_INFO_PENING: 'ORDER_INFO_PENING' = 'ORDER_INFO_PENING';
export const ORDER_INFO_FULFILLED: 'ORDER_INFO_FULFILLED' = 'ORDER_INFO_FULFILLED';
export const ORDER_INFO_ERROR: 'ORDER_INFO_ERROR' = 'ORDER_INFO_ERROR';

export const ORDER_INFO_CLEAR: 'ORDER_INFO_CLEAR' = 'ORDER_INFO_CLEAR';

export type TOrderInfoPendingAction = {
  readonly type: typeof ORDER_INFO_PENING;
};

export type TOrderInfoErrorAction = {
  readonly type: typeof ORDER_INFO_ERROR;
};

export type TOrderInfoFulfilledAction = {
  readonly type: typeof ORDER_INFO_FULFILLED;
  readonly payload: TOrder | undefined;
};

export type TOrderInfoClearAction = {
  readonly type: typeof ORDER_INFO_CLEAR;
}

export type TOrderInfoActions =
  | TOrderInfoPendingAction
  | TOrderInfoErrorAction
  | TOrderInfoFulfilledAction
  | TOrderInfoClearAction;

export const setLoading = () => ({
  type: ORDER_INFO_PENING
});

export const setError = (): TOrderInfoErrorAction => ({
  type: ORDER_INFO_ERROR,
});

export const setOrder = (order: TOrder | undefined): TOrderInfoFulfilledAction => ({
  type: ORDER_INFO_FULFILLED,
  payload: order
});

export const clearOrder = (): TOrderInfoClearAction => ({
  type: ORDER_INFO_CLEAR
});

export const getOrder: AppThunk = (number: number) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const order = await api.order.get(number);
    dispatch(setOrder(order));
  } catch (err: any) {
    dispatch(setLastError(err));
    dispatch(setError());
  }
};
