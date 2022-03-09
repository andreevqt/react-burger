import api, { TOrder } from '../api';
import { AppThunk } from '../store';
import { setLastError } from './common';
import {
  ORDER_INFO_ERROR,
  ORDER_INFO_CLEAR,
  ORDER_INFO_FULFILLED,
  ORDER_INFO_PENING,
  TOrderInfoErrorAction,
  TOrderInfoFulfilledAction,
  TOrderInfoClearAction
} from '../action-types/order-info'

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
