import api, { TError, TUpdateProps, TUser, } from '../api';
import { AppThunk, AppDispatch } from '../store';

export const AUTH_PENDING: 'AUTH_PENDING' = 'AUTH_PENDING';
export const AUTH_ERROR: 'AUTH_ERROR' = 'AUTH_ERROR';
export const AUTH_FULFILLED: 'AUTH_FULFILLED' = 'AUTH_FULFILLED';

export type TAuthData = {
  user?: TUser;
  accessToken?: string;
};

export type TAuthPendingAction = {
  readonly type: typeof AUTH_PENDING;
};

export type TAuthErrorAction = {
  readonly type: typeof AUTH_ERROR;
  readonly payload: TError | undefined;
};

export type TAuthFulfilledAction = {
  readonly type: typeof AUTH_FULFILLED;
  readonly payload: TAuthData | undefined;
};

export type TAuthActions =
  | TAuthPendingAction
  | TAuthErrorAction
  | TAuthFulfilledAction;

export const setLoading = (): TAuthPendingAction => ({
  type: AUTH_PENDING
});

export const setError = (err: TError | undefined): TAuthErrorAction => ({
  type: AUTH_ERROR,
  payload: err
});

export const setAuthData = (data: TAuthData | undefined): TAuthFulfilledAction => ({
  type: AUTH_FULFILLED,
  payload: data
});

export const register: AppThunk = (email: string, password: string, name: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const { user, accessToken, refreshToken } = await api.auth.register(email, password, name);
    dispatch(setAuthData({ user, accessToken }));
    localStorage.setItem('refreshToken', refreshToken);
  } catch (err: any) {
    dispatch(setError(err.response));
  }
};

export const login: AppThunk = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const { user, accessToken, refreshToken } = await api.auth.login(email, password);
    dispatch(setAuthData({ user, accessToken }));
    localStorage.setItem('refreshToken', refreshToken);
  } catch (err: any) {
    dispatch(setError(err.response));
  }
};

export const getUser: AppThunk = () => async (dispatch: AppDispatch, getState) => {
  const { auth } = getState();
  dispatch(setLoading());

  try {
    const { user } = await api.auth.get();
    dispatch(setAuthData({ ...auth, user }));
  } catch (err: any) {
    dispatch(setError(err.response));
  }
};

export const refresh: AppThunk = () => async (dispatch: AppDispatch, getState) => {
  const { auth } = getState();

  const token = localStorage.getItem('refreshToken');
  if (!token) {
    return;
  }

  dispatch(setLoading());

  try {
    const { refreshToken, accessToken } = await api.auth.refresh(token);
    localStorage.setItem('refreshToken', refreshToken);

    dispatch(setAuthData({ ...auth, accessToken }));
  } catch (err: any) {
    dispatch(setError(err.response));
  }
};

export const logout: AppThunk = (cb) => async (dispatch: AppDispatch) => {
  const token = localStorage.getItem('refreshToken');
  if (!token) {
    return;
  }

  dispatch(setLoading());

  try {
    await api.auth.logout(token);
    localStorage.removeItem('refreshToken');

    dispatch(setAuthData(undefined));
  } catch (err: any) {
    dispatch(setError(err.response));
  }

  if (cb) {
    cb();
  }
};

export const update: AppThunk = (data: TUpdateProps) => async (dispatch: AppDispatch, getState) => {
  const { auth } = getState();
  dispatch(setLoading());

  try {
    const { user } = await api.auth.update(data);
    dispatch(setAuthData({ ...auth, user }));
  } catch (err: any) {
    dispatch(setError(err.response));
  }
};
