import {
  SUBMIT_ORDER_ERROR,
  SUBMIT_ORDER_PENDING,
  SUBMIT_ORDER_FULFILLED,
} from '../actions/order';

const initialState = {
  error: null,
  order: null,
  isLoading: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SUBMIT_ORDER_ERROR: {
      const error = action.payload;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }
    case SUBMIT_ORDER_PENDING: {
      return { ...state, isLoading: true };
    }
    case SUBMIT_ORDER_FULFILLED: {
      const order = action.payload;
      return {
        ...state,
        isLoading: false,
        order,
      };
    }
    default:
      return state;
  }
};
