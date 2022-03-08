import order, { initialState } from './order';
import { TOrderState } from './order';
import {
  SUBMIT_ORDER_PENDING,
  SUBMIT_ORDER_ERROR,
  SUBMIT_ORDER_FULFILLED,
  CLEAR_ORDER,
  TSubmitOrderFulfilledAction
} from '../action-types/order';


describe('common reducer', () => {
  test('should return initial state', () => {
    expect(order(undefined, {} as any)).toEqual(initialState);
  });

  test('should set isLoading flag correctly if action is pending', () => {
    expect(order(initialState, { type: SUBMIT_ORDER_PENDING })).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('should set state correctly if action is fulfileld', () => {
    const payload = {
      id: 123,
      name: 'Some order'
    };

    const state: TOrderState = {
      order: undefined,
      isLoading: true
    };

    const action: TSubmitOrderFulfilledAction = {
      type: SUBMIT_ORDER_FULFILLED,
      payload
    };

    expect(order(state, action)).toEqual({
      ...state,
      order: payload,
      isLoading: false
    });
  });

  test('should reset state if action is error or clear', () => {
    const state: TOrderState = {
      order: {
        id: 123,
        name: 'Some order'
      },
      isLoading: true
    };

    // error
    expect(order(state, { type: SUBMIT_ORDER_ERROR })).toEqual(initialState);
    // clear
    expect(order(state, { type: CLEAR_ORDER })).toEqual(initialState);
  });
});
