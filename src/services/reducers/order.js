import {
  SUBMIT_ORDER_ERROR,
  SUBMIT_ORDER_PENDING,
  SUBMIT_ORDER_FULFILLED,
  CLEAR_ORDER,
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
        ...initialState,
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
    case CLEAR_ORDER: {
      return { ...state, order: null };
    }
    default:
      return state;
  }
};
