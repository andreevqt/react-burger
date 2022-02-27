import { TIngredient } from '../api';

export const CONSTRUCTOR_ADD_ITEM: 'CONSTRUCTOR_ADD_ITEM' = 'CONSTRUCTOR_ADD_ITEM';
export const CONSTRUCTOR_DELETE_ITEM: 'CONSTRUCTOR_DELETE_ITEM' = 'CONSTRUCTOR_DELETE_ITEM';
export const CONSTRUCTOR_SWAP_ITEMS: 'CONSTRUCTOR_SWAP_ITEMS' = 'CONSTRUCTOR_SWAP_ITEMS';
export const CONSTRUCTOR_RESET: 'CONSTRUCTOR_RESET' = 'CONSTRUCTOR_RESET';

export type TConstructorAddItemAction = {
  readonly type: typeof CONSTRUCTOR_ADD_ITEM;
  payload: TIngredient;
};

export type TConstructorSwapItemsAction = {
  readonly type: typeof CONSTRUCTOR_SWAP_ITEMS;
  payload: { dragIndex: number; hoverIndex: number };
};

export type TConstructorDeleteItem = {
  readonly type: typeof CONSTRUCTOR_DELETE_ITEM;
  payload: number;
};

export type TConstructorResetAction = {
  readonly type: typeof CONSTRUCTOR_RESET;
};

export type TConstructorActions =
  | TConstructorAddItemAction
  | TConstructorSwapItemsAction
  | TConstructorDeleteItem
  | TConstructorResetAction;

export const swapItems = (dragIndex: number, hoverIndex: number): TConstructorSwapItemsAction => ({
  type: CONSTRUCTOR_SWAP_ITEMS,
  payload: { dragIndex, hoverIndex }
});

export const addItem = (item: TIngredient): TConstructorAddItemAction => ({
  type: CONSTRUCTOR_ADD_ITEM,
  payload: item
});

export const deleteItem = (idx: number): TConstructorDeleteItem => ({
  type: CONSTRUCTOR_DELETE_ITEM,
  payload: idx,
});

export const reset = (): TConstructorResetAction => ({
  type: CONSTRUCTOR_RESET
});
