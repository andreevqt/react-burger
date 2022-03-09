import { TIngredient } from '../api';
import burgerConstructor, { initialState } from './burger-constructor';
import {
  CONSTRUCTOR_ADD_ITEM,
  CONSTRUCTOR_DELETE_ITEM,
  CONSTRUCTOR_RESET,
  CONSTRUCTOR_SWAP_ITEMS,
  TConstructorAddItemAction,
  TConstructorResetAction,
  TConstructorSwapItemsAction,
} from '../action-types/burger-constructor';

const main: TIngredient = {
  _id: '123',
  name: 'Main',
  type: 'main',
  proteins: 123,
  fat: 321,
  carbohydrates: 13,
  calories: 1323,
  price: 1337,
  image: 'main.png',
  image_mobile: 'main.png',
  image_large: 'main.png',
  __v: 1337,
  count: 1
};

const sauce: TIngredient = {
  _id: '123',
  name: 'Sauce',
  type: 'sauce',
  proteins: 123,
  fat: 321,
  carbohydrates: 13,
  calories: 1323,
  price: 1337,
  image: 'sauce.png',
  image_mobile: 'sauce.png',
  image_large: 'sauce.png',
  __v: 1337,
  count: 1
};

const bun: TIngredient = {
  _id: '123',
  name: 'Bun',
  type: 'bun',
  proteins: 123,
  fat: 321,
  carbohydrates: 13,
  calories: 1323,
  price: 1337,
  image: 'bun.png',
  image_mobile: 'bun.png',
  image_large: 'bun.png',
  __v: 1337,
  count: 2
};

describe('burger-constructor reducer', () => {
  test('should return initial state', () => {
    expect(burgerConstructor(undefined, {} as any)).toEqual(initialState);
  });

  test('should add sauce or main to items[]', () => {
    const action: TConstructorAddItemAction = {
      type: CONSTRUCTOR_ADD_ITEM,
      payload: sauce
    };

    expect(burgerConstructor(initialState, action)).toEqual({
      items: [
        sauce
      ],
      bun: undefined
    });
  });

  test('should add bun to bun', () => {
    const action: TConstructorAddItemAction = {
      type: CONSTRUCTOR_ADD_ITEM,
      payload: bun
    };

    expect(burgerConstructor(initialState, action)).toEqual({
      items: [],
      bun
    });
  });

  test('should delete item correctly', () => {
    const state = {
      items: [
        main,
        sauce
      ],
      bun
    };

    expect(burgerConstructor(state, {
      type: CONSTRUCTOR_DELETE_ITEM,
      payload: 0
    })).toEqual({
      items: [sauce],
      bun
    });

    expect(burgerConstructor(state, {
      type: CONSTRUCTOR_DELETE_ITEM,
      payload: 1
    })).toEqual({
      items: [main],
      bun
    });
  });

  test('should swap items', () => {
    const state = {
      items: [
        main,
        sauce
      ],
      bun
    };

    const action: TConstructorSwapItemsAction = {
      type: CONSTRUCTOR_SWAP_ITEMS,
      payload: { dragIndex: 0, hoverIndex: 1 }
    };

    expect(burgerConstructor(state, action))
      .toEqual({
        items: [
          sauce,
          main
        ],
        bun
      });
  });

  test('should reset state', () => {
    const state = {
      items: [
        main,
        sauce
      ],
      bun
    };

    const action: TConstructorResetAction = {
      type: CONSTRUCTOR_RESET
    };

    expect(burgerConstructor(state, action))
      .toEqual(initialState);
  });
});
