import { TIngredient } from '../api';
import {
  CONSTRUCTOR_RESET,
  CONSTRUCTOR_ADD_ITEM,
  CONSTRUCTOR_DELETE_ITEM,
  CONSTRUCTOR_SWAP_ITEMS,
  TConstructorSwapItemsAction,
  TConstructorAddItemAction,
  TConstructorDeleteItem,
  TConstructorResetAction
} from '../action-types/burger-constructor';

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
