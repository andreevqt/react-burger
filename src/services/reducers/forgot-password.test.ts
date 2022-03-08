import forgotPassword, { initialState } from './forgot-password';
import {
  FORGOT_PASSWORD_PENDING,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_FULFILLED,
  Step
} from '../action-types/forgot-password';

describe('forgot-password reducer', () => {
  test('should return initial state', () => {
    expect(forgotPassword(undefined, {} as any)).toEqual(initialState);
  });

  test('should set isLoading flag correctly', () => {
    expect(forgotPassword(initialState, { type: FORGOT_PASSWORD_PENDING }))
      .toEqual({
        ...initialState,
        isLoading: true
      });
  });

  test('should reset state if error', () => {
    const state = {
      isLoading: true,
      step: Step.CODE
    };

    expect(forgotPassword(state, { type: FORGOT_PASSWORD_ERROR }))
      .toEqual(initialState);
  });

  test('should set state correctly if fulfilled', () => {
    const stateCode = {
      isLoading: true,
      step: Step.CODE
    };

    expect(forgotPassword(stateCode, { type: FORGOT_PASSWORD_FULFILLED }))
      .toEqual({
        isLoading: false,
        step: Step.RESET
      });

    const stateReset = {
      isLoading: true,
      step: Step.RESET
    };

    expect(forgotPassword(stateReset, { type: FORGOT_PASSWORD_FULFILLED }))
      .toEqual({
        isLoading: false,
        step: Step.CODE
      });
  });
});
