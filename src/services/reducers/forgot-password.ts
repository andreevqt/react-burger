import { Step } from '../action-types/forgot-password';
import {
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_FULFILLED,
  FORGOT_PASSWORD_PENDING,
  TForgotPasswordActions,
} from '../action-types/forgot-password';

export type TForgotPasswordState = {
  isLoading: boolean;
  step: Step;
};

export const initialState: TForgotPasswordState = {
  isLoading: false,
  step: Step.CODE
};

const forgotPassword = (state = initialState, action: TForgotPasswordActions): TForgotPasswordState => {
  switch (action.type) {
    case FORGOT_PASSWORD_PENDING: {
      return { ...state, isLoading: true };
    }
    case FORGOT_PASSWORD_ERROR: {
      return initialState;
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

export default forgotPassword;
