export const FORGOT_PASSWORD_FULFILLED: 'FORGOT_PASSWORD_FULFILLED' = 'FORGOT_PASSWORD_FULFILLED';
export const FORGOT_PASSWORD_PENDING: 'FORGOT_PASSWORD_PENDING' = 'FORGOT_PASSWORD_PENDING';
export const FORGOT_PASSWORD_ERROR: 'FORGOT_PASSWORD_ERROR' = 'FORGOT_PASSWORD_ERROR';

export type TForgotPasswordFulfilledAction = {
  readonly type: typeof FORGOT_PASSWORD_FULFILLED;
};

export type TForgotPasswordErrorAction = {
  readonly type: typeof FORGOT_PASSWORD_ERROR;
};

export type TForgotPasswordPendingAction = {
  readonly type: typeof FORGOT_PASSWORD_PENDING;
};

export const enum Step {
  CODE,
  RESET
};

export type TForgotPasswordActions =
  | TForgotPasswordFulfilledAction
  | TForgotPasswordPendingAction
  | TForgotPasswordErrorAction;
