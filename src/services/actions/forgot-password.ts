import api, { TError } from '../api';
import { AppThunk } from '../store';

export const FORGOT_PASSWORD_FULFILLED: 'FORGOT_PASSWORD_FULFILLED' = 'FORGOT_PASSWORD_FULFILLED';
export const FORGOT_PASSWORD_PENDING: 'FORGOT_PASSWORD_PENDING' = 'FORGOT_PASSWORD_PENDING';
export const FORGOT_PASSWORD_ERROR: 'FORGOT_PASSWORD_ERROR' = 'FORGOT_PASSWORD_ERROR';

export type TForgotPasswordFulfilledAction = {
  readonly type: typeof FORGOT_PASSWORD_FULFILLED;
};

export type TForgotPasswordErrorAction = {
  readonly type: typeof FORGOT_PASSWORD_ERROR;
  readonly payload: TError | undefined;
};

export type TForgotPasswordPendingAction = {
  readonly type: typeof FORGOT_PASSWORD_PENDING;
};

export type TForgotPasswordActions =
  | TForgotPasswordFulfilledAction
  | TForgotPasswordPendingAction
  | TForgotPasswordErrorAction;

export const enum Step {
  CODE,
  RESET
};

export const setStep = (): TForgotPasswordFulfilledAction => ({
  type: FORGOT_PASSWORD_FULFILLED
});

export const setLoading = (): TForgotPasswordPendingAction => ({
  type: FORGOT_PASSWORD_PENDING
});

export const setError = (err: TError | undefined): TForgotPasswordErrorAction => ({
  type: FORGOT_PASSWORD_ERROR,
  payload: err
});

export const getCode: AppThunk = (email) => async (dispatch) => {
  dispatch(setLoading());
  try {
    await api.password.getCode(email);
    dispatch(setStep());
  } catch (err: any) {
    dispatch(setError(err.response));
  }
};

export const reset: AppThunk = (password, token) => async (dispatch) => {
  dispatch(setLoading());
  try {
    await api.password.reset(password, token);
    dispatch(setStep());
  } catch (err: any) {
    dispatch(setError(err.response));
  }
};
