import common, { initialState } from './common';
import { SET_LAST_ERROR } from '../action-types/common';

describe('common reducer', () => {
  test('should return initial state', () => {
    expect(common(undefined, {} as any)).toEqual(initialState);
  });

  test('should set error correctly', () => {
    expect(common(initialState, { type: SET_LAST_ERROR, payload: 'some_error' } as any)).toEqual({
      lastErr: 'some_error'
    });
  });
});
