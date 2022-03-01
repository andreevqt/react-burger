
import { FEED_WS_CLOSED, FEED_WS_ERROR, TFeedActions, FEED_WS_MESSAGE, FEED_WS_SUCCESS } from '../actions/feed';
import { TOrder } from '../api';

type TFeedState = {
  connected: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeedState = {
  connected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export default (state: TFeedState = initialState, action: TFeedActions): TFeedState => {
  switch (action.type) {
    case FEED_WS_SUCCESS: {
      return {
        ...state,
        connected: true
      };
    }
    case FEED_WS_MESSAGE: {
      const message = action.payload;
      return {
        ...state,
        ...message
      };
    }
    case FEED_WS_CLOSED:
    case FEED_WS_ERROR: {
      return {
        ...state,
        connected: false
      };
    }
    default: {
      return state;
    }
  }
};
