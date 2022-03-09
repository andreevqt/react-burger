import { TOrder } from '../api';

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
