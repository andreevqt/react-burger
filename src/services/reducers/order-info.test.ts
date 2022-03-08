import orderInfo, { initialState, TOrderInfoState } from './order-info';
import { TOrder } from '../api';
import {
  ORDER_INFO_CLEAR,
  ORDER_INFO_ERROR,
  ORDER_INFO_FULFILLED,
  ORDER_INFO_PENING,
  TOrderInfoFulfilledAction,
  TOrderInfoPendingAction
} from '../action-types/order-info';

describe('order-info reducer', () => {
  test('should return initial state', () => {
    expect(orderInfo(undefined, {} as any)).toEqual(initialState);
  });

  test('should set isLoading flag correctly if action is pending', () => {
    expect(orderInfo(initialState, { type: ORDER_INFO_PENING })).toEqual({
      ...initialState,
      isPending: true
    });
  });

  test('should reset state correctly if action is error or clear', () => {
    const state: TOrderInfoState = {
      order: {
        _id: '123',
        ingredients: ['123', '123', '123'],
        name: 'Some order',
        number: 12345,
        status: 'done',
        createdAt: '1970-01-01 00:00:00',
        updatedAt: '1970-01-01 00:00:00'
      },
      isPending: true
    };

    // error
    expect(orderInfo(state, { type: ORDER_INFO_ERROR })).toEqual(initialState);
    // clear
    expect(orderInfo(state, { type: ORDER_INFO_CLEAR })).toEqual(initialState);
  });

  test('should set state correctly if action is fulfilled', () => {
    const state: TOrderInfoState = {
      order: undefined,
      isPending: true
    };

    const order: TOrder = {
      _id: '123',
      ingredients: ['123', '123', '123'],
      name: 'Some order',
      number: 12345,
      status: 'done',
      createdAt: '1970-01-01 00:00:00',
      updatedAt: '1970-01-01 00:00:00'
    };

    const action: TOrderInfoFulfilledAction = {
      type: ORDER_INFO_FULFILLED,
      payload: order
    };

    expect(orderInfo(state, action)).toEqual({
      ...state,
      isPending: false,
      order
    });
  });
});
