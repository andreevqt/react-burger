import auth, { initialState } from './auth';
import {
  AUTH_ERROR,
  AUTH_FULFILLED,
  AUTH_PENDING,
  TAuthErrorAction,
  TAuthFulfilledAction,
  TAuthPendingAction
} from '../action-types/auth';

describe('auth reducer', () => {
  test('should return initial state', () => {
    expect(auth(undefined, {} as any)).toEqual(initialState);
  });

  test('should return initial state if error', () => {
    const action: TAuthErrorAction = { type: AUTH_ERROR };
    expect(auth(undefined, action)).toEqual(initialState);
  });

  test('should set loading flag if pending', () => {
    const state = {
      isLoading: false,
      accessToken: undefined,
      user: undefined
    };

    const action: TAuthPendingAction = { type: AUTH_PENDING };
    expect(auth(state, action)).toEqual({
      ...state,
      isLoading: true
    });
  });

  test('should set user data if fulfilled', () => {
    const state = {
      isLoading: true,
      accessToken: undefined,
      user: undefined
    };

    const userData = {
      user: {
        id: '1',
        name: 'John Doe',
        email: 'example@gmail.com'
      },
      accessToken: '12345'
    };

    const action: TAuthFulfilledAction = {
      type: AUTH_FULFILLED,
      payload: userData
    };

    expect(auth(state, action)).toEqual({
      ...userData,
      isLoading: false
    });
  });
});
