import { AUTH_ERROR, AUTH_FULFILLED, AUTH_PENDING, TAuthActions } from '../actions/auth';
import { TUser } from '../api'

type TAuthState = {
  isLoading: boolean;
  accessToken: string | undefined;
  user: TUser | undefined;
};

const initialState: TAuthState = {
  isLoading: false,
  accessToken: undefined,
  user: undefined,
};

const auth = (state: TAuthState = initialState, action: TAuthActions): TAuthState => {
  switch (action.type) {
    case AUTH_ERROR: {
      return initialState;
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
        user,
        isLoading: false,
        ...(accessToken && { accessToken })
      };
    }
    default: {
      return state;
    }
  }
};

export default auth;
