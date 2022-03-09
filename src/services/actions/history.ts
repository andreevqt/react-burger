import { TOrdersMessage } from '../api';
import {
  HISTORY_WS_INIT,
  HISTORY_WS_CLOSE,
  HISTORY_WS_CLOSED,
  HISTORY_WS_ERROR,
  HISTORY_WS_MESSAGE,
  HISTORY_WS_SUCCESS,
  THistoryWsClose,
  THistoryWsClosed,
  THistoryWsError,
  THistoryWsInit,
  THistoryWsMessage,
  THistoryWsSucess
} from '../action-types/history';

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
