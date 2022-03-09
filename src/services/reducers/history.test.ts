import history, {
  initialState,
  THistoryState,
} from './history';
import {
  HISTORY_WS_SUCCESS,
  HISTORY_WS_MESSAGE,
  THistoryWsMessage,
  THistoryWsSucess,
  HISTORY_WS_CLOSED,
  HISTORY_WS_ERROR
} from '../action-types/history';

describe('history reducer', () => {
  test('should return initial state', () => {
    expect(history(undefined, {} as any)).toEqual(initialState);
  });

  test('should set connected flag on success action', () => {
    const action: THistoryWsSucess = {
      type: HISTORY_WS_SUCCESS
    };

    expect(history(initialState, action)).toEqual({
      ...initialState,
      connected: true
    });
  });

  test('should set message on message action', () => {
    const state: THistoryState = {
      connected: true,
      orders: [],
      total: 0,
      totalToday: 0
    };

    const action: THistoryWsMessage = {
      type: HISTORY_WS_MESSAGE,
      payload: {
        orders: [{
          _id: '123',
          ingredients: ['123', '123', '123'],
          status: 'done',
          name: 'Some order',
          number: 1337,
          createdAt: '1970-01-01 00:00:00',
          updatedAt: '1970-01-01 00:00:00'
        }],
        total: 1,
        totalToday: 2
      }
    };

    expect(history(state, action)).toEqual({
      ...state,
      orders: [
        {
          _id: '123',
          ingredients: ['123', '123', '123'],
          status: 'done',
          name: 'Some order',
          number: 1337,
          createdAt: '1970-01-01 00:00:00',
          updatedAt: '1970-01-01 00:00:00'
        }
      ],
      total: 1,
      totalToday: 2
    });
  });

  test('should set connected = false on closed and error actions', () => {
    const state: THistoryState = {
      connected: true,
      orders: [{
        _id: '123',
        ingredients: ['123', '123', '123'],
        status: 'done',
        name: 'Some order',
        number: 1337,
        createdAt: '1970-01-01 00:00:00',
        updatedAt: '1970-01-01 00:00:00'
      }],
      total: 1,
      totalToday: 1
    };

    // closed
    expect(history(state, { type: HISTORY_WS_CLOSED })).toEqual({
      ...state,
      connected: false
    });
    // error
    expect(history(state, { type: HISTORY_WS_ERROR })).toEqual({
      ...state,
      connected: false
    });
  });
});
