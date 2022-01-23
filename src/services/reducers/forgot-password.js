import {
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_FULFILLED,
  FORGOT_PASSWORD_PENDING,
  Step
} from '../actions/forgot-password';

const initialState = {
  isLoading: false,
  error: null,
  step: Step.CODE
};

export default (state = initialState, action = {}) => {
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
