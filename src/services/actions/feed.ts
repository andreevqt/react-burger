import { TOrdersMessage } from '../api';
import {
  TFeedWsInit,
  TFeedWsClose,
  TFeedWsClosed,
  TFeedWsError,
  TFeedWsMessage,
  TFeedWsSucess,
  FEED_WS_INIT,
  FEED_WS_CLOSE,
  FEED_WS_CLOSED,
  FEED_WS_ERROR,
  FEED_WS_MESSAGE,
  FEED_WS_SUCCESS
} from '../action-types/feed';

export const feedWsInit = (): TFeedWsInit => ({
  type: FEED_WS_INIT,
});

export const feedWsSuccess = (): TFeedWsSucess => ({
  type: FEED_WS_SUCCESS
});

export const feedWsError = (): TFeedWsError => ({
  type: FEED_WS_ERROR
});

export const feedWsClosed = (): TFeedWsClosed => ({
  type: FEED_WS_CLOSED
});

export const feedWsClose = (): TFeedWsClose => ({
  type: FEED_WS_CLOSE
});

export const feedWsMessage = (payload: TOrdersMessage): TFeedWsMessage => ({
  type: FEED_WS_MESSAGE,
  payload
});
