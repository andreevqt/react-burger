import { TAuthData } from '../api';

export const AUTH_PENDING: 'AUTH_PENDING' = 'AUTH_PENDING';
export const AUTH_ERROR: 'AUTH_ERROR' = 'AUTH_ERROR';
export const AUTH_FULFILLED: 'AUTH_FULFILLED' = 'AUTH_FULFILLED';

export type TAuthPendingAction = {
  readonly type: typeof AUTH_PENDING;
};

export type TAuthErrorAction = {
  readonly type: typeof AUTH_ERROR;
};

export type TAuthFulfilledAction = {
  readonly type: typeof AUTH_FULFILLED;
  readonly payload: TAuthData | undefined;
};

export type TAuthActions =
  | TAuthPendingAction
  | TAuthErrorAction
  | TAuthFulfilledAction;
