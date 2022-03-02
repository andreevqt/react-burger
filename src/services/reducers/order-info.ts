import { TError, TOrder } from '../api';
import {
  TOrderInfoActions,
  ORDER_INFO_ERROR,
  ORDER_INFO_FULFILLED,
  ORDER_INFO_PENING,
  ORDER_INFO_CLEAR
} from '../actions/order-info';

type TOrderInfoState = {
  order: TOrder | undefined;
  isPending: boolean;
  error: TError | undefined;
};

const initialState: TOrderInfoState = {
  order: undefined,
  isPending: false,
  error: undefined
};

const orderInfo = (state = initialState, action: TOrderInfoActions): TOrderInfoState => {
  switch (action.type) {
    case ORDER_INFO_ERROR: {
      const error = action.payload;
      return {
        ...initialState,
        error
      };
    }
    case ORDER_INFO_PENING: {
      return {
        ...state,
        isPending: true
      };
    }
    case ORDER_INFO_FULFILLED: {
      const order = action.payload;
      return {
        ...state,
        isPending: false,
        order
      };
    }
    case ORDER_INFO_CLEAR: {
      return initialState;
    }
    default:
      return state;
  }
};

export default orderInfo;
