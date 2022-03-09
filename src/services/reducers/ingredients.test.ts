import ingredients, { initialState, TIngredientsState } from './ingredients';
import {
  GET_ITEMS_ERROR,
  GET_ITEMS_FULFILLED,
  GET_ITEMS_PENDING,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  TGetItemsFulFilledAction,
  CLEAR_COUNT
} from '../action-types/ingredients';
import { TIngredient } from '../api';

describe('ingredients reducer', () => {
  test('should return initial state', () => {
    expect(ingredients(undefined, {} as any)).toEqual(initialState);
  });

  test('should set isLoading flag correctly if action type is pending', () => {
    expect(ingredients(initialState, { type: GET_ITEMS_PENDING })).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('should reset state if action type is error', () => {
    expect(ingredients(initialState, { type: GET_ITEMS_ERROR })).toEqual(initialState);
  });

  test('should set state correctly if action type is fulfilled', () => {
    const state: TIngredientsState = {
      isLoading: true,
      items: [],
    };

    const ingredient: TIngredient = {
      calories: 99,
      carbohydrates: 42,
      fat: 24,
      image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
      name: 'Соус традиционный галактический',
      price: 15,
      proteins: 42,
      type: 'sauce',
      __v: 0,
      _id: '60d3b41abdacab0026a733ce',
    };

    const action: TGetItemsFulFilledAction = {
      type: GET_ITEMS_FULFILLED,
      payload: [ingredient]
    };

    expect(ingredients(state, action)).toEqual({
      ...state,
      isLoading: false,
      items: [ingredient]
    });
  });

  test('should increment item', () => {
    const ingredient: TIngredient = {
      calories: 99,
      carbohydrates: 42,
      fat: 24,
      image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
      name: 'Соус традиционный галактический',
      price: 15,
      proteins: 42,
      type: 'sauce',
      __v: 0,
      _id: '60d3b41abdacab0026a733ce'
    };

    const state: TIngredientsState = {
      isLoading: false,
      items: [ingredient],
    };

    expect(ingredients(state, { type: INCREMENT_ITEM, payload: '60d3b41abdacab0026a733ce' })).toEqual({
      ...state,
      isLoading: false,
      items: [{
        ...ingredient,
        count: 1
      }]
    });
  });

  test('should decrement item', () => {
    const ingredient: TIngredient = {
      calories: 99,
      carbohydrates: 42,
      fat: 24,
      image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
      name: 'Соус традиционный галактический',
      price: 15,
      proteins: 42,
      count: 1,
      type: 'sauce',
      __v: 0,
      _id: '60d3b41abdacab0026a733ce'
    };

    const state: TIngredientsState = {
      isLoading: false,
      items: [ingredient]
    };

    expect(ingredients(state, { type: DECREMENT_ITEM, payload: '60d3b41abdacab0026a733ce' })).toEqual({
      ...state,
      isLoading: false,
      items: [{
        ...ingredient,
        count: undefined
      }]
    });
  });

  test('should clear count on all items', () => {
    const ingredient: TIngredient = {
      calories: 99,
      carbohydrates: 42,
      fat: 24,
      image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
      name: 'Соус традиционный галактический',
      price: 15,
      proteins: 42,
      count: 3,
      type: 'sauce',
      __v: 0,
      _id: '60d3b41abdacab0026a733ce'
    };

    const state: TIngredientsState = {
      isLoading: false,
      items: [ingredient]
    };

    expect(ingredients(state, { type: CLEAR_COUNT })).toEqual({
      ...state,
      isLoading: false,
      items: [{
        ...ingredient,
        count: undefined
      }]
    });
  });
});
