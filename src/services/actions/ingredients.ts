import api, { TError, TIngredient } from '../api';
import { AppThunk } from '../store';

export const GET_ITEMS_PENDING: 'GET_ITEMS_PENDING' = 'GET_ITEMS_PENDING';
export const GET_ITEMS_FULFILLED: 'GET_ITEMS_FULFILLED' = 'GET_ITEMS_FULFILLED';
export const GET_ITEMS_ERROR: 'GET_ITEMS_ERROR' = 'GET_ITEMS_ERROR';
export const INCREMENT_ITEM: 'INCREMENT_ITEM' = 'INCREMENT_ITEM';
export const DECREMENT_ITEM: 'DECREMENT_ITEM' = 'DECREMENT_ITEM';
export const CLEAR_COUNT: 'CLEAR_COUNT' = 'CLEAR_COUNT';

export type TGetItemsPendingAction = {
  readonly type: typeof GET_ITEMS_PENDING;
};

export type TGetItemsFulFilledAction = {
  readonly type: typeof GET_ITEMS_FULFILLED;
  readonly payload: TIngredient[];
};

export type TGetItemsErrorAction = {
  readonly type: typeof GET_ITEMS_ERROR;
  readonly payload: TError | undefined;
};

export type TIncrementItemAction = {
  readonly type: typeof INCREMENT_ITEM;
  readonly payload: string;
};

export type TDecrementItemAction = {
  readonly type: typeof DECREMENT_ITEM;
  readonly payload: string;
};

export type TClearCountAction = {
  readonly type: typeof CLEAR_COUNT;
};

export type TIngredientActions =
  | TGetItemsPendingAction
  | TGetItemsFulFilledAction
  | TGetItemsErrorAction
  | TIncrementItemAction
  | TDecrementItemAction
  | TClearCountAction;

export const setItems = (items: TIngredient[]): TGetItemsFulFilledAction => ({
  type: GET_ITEMS_FULFILLED,
  payload: items,
});

export const setError = (err: TError | undefined): TGetItemsErrorAction => ({
  type: GET_ITEMS_ERROR,
  payload: err,
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
    dispatch(setError(err.message));
  }
};
