import {
  SUBMIT_ORDER_ERROR,
  SUBMIT_ORDER_PENDING,
  SUBMIT_ORDER_FULFILLED,
  CLEAR_ORDER,
  TOrderActions,
  TOrder
} from '../actions/order';

type TOrderState = {
  error: string | object | undefined;
  order: TOrder | undefined;
  isLoading: boolean;
};

const initialState: TOrderState = {
  error: undefined,
  order: undefined,
  isLoading: false,
};

const order = (state: TOrderState = initialState, action: TOrderActions): TOrderState => {
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
      return { ...state, order: undefined };
    }
    default:
      return state;
  }
};

export default order;
