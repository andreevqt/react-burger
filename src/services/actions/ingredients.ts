import api, { TIngredient } from '../api';
import { AppThunk } from '../store';
import { setLastError } from './common';
import {
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  CLEAR_COUNT,
  GET_ITEMS_ERROR,
  GET_ITEMS_FULFILLED,
  GET_ITEMS_PENDING,
  TGetItemsErrorAction,
  TGetItemsPendingAction,
  TIncrementItemAction,
  TDecrementItemAction,
  TClearCountAction,
  TGetItemsFulFilledAction
} from '../action-types/ingredients';

export const setItems = (items: TIngredient[]): TGetItemsFulFilledAction => ({
  type: GET_ITEMS_FULFILLED,
  payload: items,
});

export const setError = (): TGetItemsErrorAction => ({
  type: GET_ITEMS_ERROR,
});

export const setLoading = (): TGetItemsPendingAction => ({
  type: GET_ITEMS_PENDING,
});

export const increment = (id: string): TIncrementItemAction => ({
  type: INCREMENT_ITEM,
  payload: id
});

export const decrement = (id: string): TDecrementItemAction => ({
  type: DECREMENT_ITEM,
  payload: id
});

export const clearCount = (): TClearCountAction => ({
  type: CLEAR_COUNT
});

export const getItems: AppThunk = () => async (dispatch, getState) => {
  const { isLoading } = getState().ingredients;
  if (isLoading) {
    return;
  }

  dispatch(setLoading());

  try {
    const items = await api.ingredients.list();
    dispatch(setItems(items));
  } catch (err: any) {
    dispatch(setLastError(err))
    dispatch(setError());
  }
};
