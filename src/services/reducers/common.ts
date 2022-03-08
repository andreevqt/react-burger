import { SET_LAST_ERROR, TCommonActions } from '../action-types/common';
import { TError } from '../api'

export type TCommonState = {
  lastErr: TError | undefined;
};

export const initialState: TCommonState = {
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
