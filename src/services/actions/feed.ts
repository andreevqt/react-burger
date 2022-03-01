import { TOrdersMessage } from '../api';

export const FEED_WS_INIT: 'FEED_WS_INIT' = 'FEED_WS_INIT';
export const FEED_WS_SUCCESS: 'FEED_WS_SUCCESS' = 'FEED_WS_SUCCESS';
export const FEED_WS_CLOSED: 'FEED_WS_CLOSED' = 'FEED_WS_CLOSED';
export const FEED_WS_CLOSE: 'FEED_WS_CLOSE' = 'FEED_WS_CLOSE';
export const FEED_WS_ERROR: 'FEED_WS_ERROR' = 'FEED_WS_ERROR';
export const FEED_WS_MESSAGE: 'FEED_WS_MESSAGE' = 'FEED_WS_MESSAGE';

export type TFeedWsInit = {
  readonly type: typeof FEED_WS_INIT;
};

export type TFeedWsSucess = {
  readonly type: typeof FEED_WS_SUCCESS;
};

export type TFeedWsClosed = {
  readonly type: typeof FEED_WS_CLOSED;
};

export type TFeedWsClose = {
  readonly type: typeof FEED_WS_CLOSE;
};

export type TFeedWsError = {
  readonly type: typeof FEED_WS_ERROR;
};

export type TFeedWsMessage = {
  readonly type: typeof FEED_WS_MESSAGE;
  readonly payload: TOrdersMessage;
};

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

export type TFeedActions =
  | TFeedWsInit
  | TFeedWsClosed
  | TFeedWsError
  | TFeedWsMessage
  | TFeedWsSucess
  | TFeedWsClose;
