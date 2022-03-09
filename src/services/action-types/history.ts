import { TOrdersMessage } from '../api';

export const HISTORY_WS_INIT: 'HISTORY_WS_INIT' = 'HISTORY_WS_INIT';
export const HISTORY_WS_SUCCESS: 'HISTORY_WS_SUCCESS' = 'HISTORY_WS_SUCCESS';
export const HISTORY_WS_CLOSE: 'HISTORY_WS_CLOSE' = 'HISTORY_WS_CLOSE';
export const HISTORY_WS_CLOSED: 'HISTORY_WS_CLOSED' = 'HISTORY_WS_CLOSED';
export const HISTORY_WS_ERROR: 'HISTORY_WS_ERROR' = 'HISTORY_WS_ERROR';
export const HISTORY_WS_MESSAGE: 'HISTORY_WS_MESSAGE' = 'HISTORY_WS_MESSAGE';

export type THistoryWsInit = {
  readonly type: typeof HISTORY_WS_INIT;
};

export type THistoryWsSucess = {
  readonly type: typeof HISTORY_WS_SUCCESS;
};

export type THistoryWsClosed = {
  readonly type: typeof HISTORY_WS_CLOSED;
};

export type THistoryWsClose = {
  readonly type: typeof HISTORY_WS_CLOSE;
};

export type THistoryWsError = {
  readonly type: typeof HISTORY_WS_ERROR;
};

export type THistoryWsMessage = {
  readonly type: typeof HISTORY_WS_MESSAGE;
  readonly payload: Omit<TOrdersMessage, 'success'>;
};

export type THistoryActions =
  | THistoryWsInit
  | THistoryWsClosed
  | THistoryWsError
  | THistoryWsMessage
  | THistoryWsSucess
  | THistoryWsClose;
  