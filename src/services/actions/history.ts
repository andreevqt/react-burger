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
  readonly payload: TOrdersMessage;
};

export const historyWsInit = (): THistoryWsInit => ({
  type: HISTORY_WS_INIT,
});

export const historyWsSuccess = (): THistoryWsSucess => ({
  type: HISTORY_WS_SUCCESS
});

export const historyWsError = (): THistoryWsError => ({
  type: HISTORY_WS_ERROR
});

export const historyWsClosed = (): THistoryWsClosed => ({
  type: HISTORY_WS_CLOSED
});

export const historyWsClose = (): THistoryWsClose => ({
  type: HISTORY_WS_CLOSE
});

export const historyWsMessage = (payload: TOrdersMessage): THistoryWsMessage => ({
  type: HISTORY_WS_MESSAGE,
  payload
});

export type THistoryActions =
  | THistoryWsInit
  | THistoryWsClosed
  | THistoryWsError
  | THistoryWsMessage
  | THistoryWsSucess
  | THistoryWsClose;
