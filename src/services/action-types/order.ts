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
