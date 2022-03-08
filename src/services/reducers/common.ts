import { SET_LAST_ERROR, TCommonActions } from '../actions/common';
import { TError } from '../api'

type TCommonState = {
  lastErr: TError | undefined;
};

const initialState: TCommonState = {
  lastErr: undefined
};

const commonReducer = (state = initialState, action: TCommonActions): TCommonState => {
  switch (action.type) {
    case SET_LAST_ERROR: {
      const lastErr = action.payload;
      return {
        ...state,
        lastErr
      };
    }
    default: {
      return state;
    }
  }
};

export default commonReducer;
