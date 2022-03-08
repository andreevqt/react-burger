import feed, {
  initialState,
  TFeedState
} from './feed';
import {
  FEED_WS_SUCCESS,
  FEED_WS_MESSAGE,
  TFeedWsMessage,
  TFeedWsSucess,
  FEED_WS_CLOSED,
  FEED_WS_ERROR
} from '../action-types/feed';

describe('feed reducer', () => {
  test('should return initial state', () => {
    expect(feed(undefined, {} as any)).toEqual(initialState);
  });

  test('should set connected flag on success action', () => {
    const action: TFeedWsSucess = {
      type: FEED_WS_SUCCESS
    };

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      connected: true
    });
  });

  test('should set message on message action', () => {
    const state: TFeedState = {
      connected: true,
      orders: [],
      total: 0,
      totalToday: 0
    };

    const action: TFeedWsMessage = {
      type: FEED_WS_MESSAGE,
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

    expect(feed(state, action)).toEqual({
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
    const state: TFeedState = {
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
    expect(feed(state, { type: FEED_WS_CLOSED })).toEqual({ ...state, connected: false });
    // error
    expect(feed(state, { type: FEED_WS_ERROR })).toEqual({ ...state, connected: false });
  });
});
