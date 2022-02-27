import {
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_FULFILLED,
  FORGOT_PASSWORD_PENDING,
  TForgotPasswordActions,
  Step
} from '../actions/forgot-password';

type TForgotPasswordState = {
  isLoading: boolean;
  error: object | string | undefined;
  step: Step;
};

const initialState: TForgotPasswordState = {
  isLoading: false,
  error: undefined,
  step: Step.CODE
};

export default (state = initialState, action: TForgotPasswordActions) => {
  switch (action.type) {
    case FORGOT_PASSWORD_PENDING: {
      return { ...state, isLoading: true };
    }
    case FORGOT_PASSWORD_ERROR: {
      const error = action.payload;
      return { ...initialState, error };
    }
    case FORGOT_PASSWORD_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        step: state.step === Step.CODE
          ? Step.RESET
          : Step.CODE
      };
    }
    default: {
      return state;
    }
  }
};
