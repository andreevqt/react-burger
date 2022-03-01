import { TOrder } from '../api';
import {
  HISTORY_WS_CLOSED,
  HISTORY_WS_ERROR,
  THistoryActions,
  HISTORY_WS_MESSAGE,
  HISTORY_WS_SUCCESS
} from '../actions/history';

type THistoryState = {
  connected: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: THistoryState = {
  connected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export default (state: THistoryState = initialState, action: THistoryActions): THistoryState => {
  switch (action.type) {
    case HISTORY_WS_SUCCESS: {
      return {
        ...state,
        connected: true
      };
    }
    case HISTORY_WS_MESSAGE: {
      const message = action.payload;
      return {
        ...state,
        ...message
      };
    }
    case HISTORY_WS_ERROR:
    case HISTORY_WS_CLOSED: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
