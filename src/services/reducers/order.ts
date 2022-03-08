import {
  SUBMIT_ORDER_ERROR,
  SUBMIT_ORDER_PENDING,
  SUBMIT_ORDER_FULFILLED,
  CLEAR_ORDER,
  TOrderActions,
  TOrder
} from '../actions/order';

type TOrderState = {
  order: TOrder | undefined;
  isLoading: boolean;
};

const initialState: TOrderState = {
  order: undefined,
  isLoading: false
};

const order = (state: TOrderState = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case SUBMIT_ORDER_PENDING: {
      return { ...state, isLoading: true };
    }
    case SUBMIT_ORDER_FULFILLED: {
      const order = action.payload;
      return {
        ...state,
        isLoading: false,
        order
      };
    }
    case SUBMIT_ORDER_ERROR:
    case CLEAR_ORDER: {
      return initialState;
    }
    default:
      return state;
  }
};

export default order;
