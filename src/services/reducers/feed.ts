import { TOrder } from '../api';
import {
  FEED_WS_CLOSED,
  FEED_WS_ERROR,
  FEED_WS_MESSAGE,
  FEED_WS_SUCCESS,
  TFeedActions
} from '../action-types/feed';

export type TFeedState = {
  connected: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export const initialState: TFeedState = {
  connected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

const feed = (state: TFeedState = initialState, action: TFeedActions): TFeedState => {
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

export default feed;
