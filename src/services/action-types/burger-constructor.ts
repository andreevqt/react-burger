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
  readonly payload: { dragIndex: number; hoverIndex: number };
};

export type TConstructorDeleteItem = {
  readonly type: typeof CONSTRUCTOR_DELETE_ITEM;
  readonly payload: number;
};

export type TConstructorResetAction = {
  readonly type: typeof CONSTRUCTOR_RESET;
};

export type TConstructorActions =
  | TConstructorAddItemAction
  | TConstructorSwapItemsAction
  | TConstructorDeleteItem
  | TConstructorResetAction;
