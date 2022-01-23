import { AUTH_ERROR, AUTH_FULFILLED, AUTH_PENDING } from '../actions/auth';

const initialState = {
  isLoading: false,
  accessToken: null,
  user: null,
  error: null
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case AUTH_ERROR: {
      const error = action.payload;
      return {
        ...initialState,
        error
      };
    }
    case AUTH_PENDING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case AUTH_FULFILLED: {
      // handle logout
      if (!action.payload) {
        return initialState;
      }

      const { user, accessToken } = action.payload;
      return {
        ...state,
        isLoading: false,
        user,
        accessToken
      };
    }
    default: {
      return state;
    }
  }
};
