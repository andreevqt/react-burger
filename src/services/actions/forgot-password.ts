import api from '../api';
import { AppThunk } from '../store';
import { setLastError } from './common';
import {
  TForgotPasswordFulfilledAction,
  TForgotPasswordErrorAction,
  TForgotPasswordPendingAction,
  FORGOT_PASSWORD_FULFILLED,
  FORGOT_PASSWORD_PENDING,
  FORGOT_PASSWORD_ERROR
} from '../action-types/forgot-password';

export const setStep = (): TForgotPasswordFulfilledAction => ({
  type: FORGOT_PASSWORD_FULFILLED
});

export const setLoading = (): TForgotPasswordPendingAction => ({
  type: FORGOT_PASSWORD_PENDING
});

export const setError = (): TForgotPasswordErrorAction => ({
  type: FORGOT_PASSWORD_ERROR
});

export const getCode: AppThunk = (email) => async (dispatch) => {
  dispatch(setLoading());
  try {
    await api.password.getCode(email);
    dispatch(setStep());
  } catch (err: any) {
    dispatch(setLastError(err));
    dispatch(setError());
  }
};

export const reset: AppThunk = (password, token) => async (dispatch) => {
  dispatch(setLoading());
  try {
    await api.password.reset(password, token);
    dispatch(setStep());
  } catch (err: any) {
    dispatch(setLastError(err));
    dispatch(setError());
  }
};
