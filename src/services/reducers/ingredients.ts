import { TIngredient } from '../api';

import {
  GET_ITEMS_PENDING,
  GET_ITEMS_FULFILLED,
  GET_ITEMS_ERROR,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  TIngredientActions,
  CLEAR_COUNT
} from '../actions/ingredients';

type TIngredientsState = {
  isLoading: boolean;
  error: string | object | undefined;
  bun: TIngredient | undefined;
  items: TIngredient[];
}

const initialState: TIngredientsState = {
  isLoading: false,
  error: undefined,
  bun: undefined,
  items: [],
};

export default (state = initialState, action: TIngredientActions): TIngredientsState => {
  switch (action.type) {
    case GET_ITEMS_PENDING: {
      return { ...state, isLoading: true };
    }
    case GET_ITEMS_FULFILLED: {
      return {
        ...state,
        items: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case GET_ITEMS_ERROR: {
      return { ...initialState, error: action.payload };
    }
    case INCREMENT_ITEM: {
      const id = action.payload;
      return {
        ...state,
        items: state.items.map((item) => (item._id === id
          ? { ...item, count: item.count ? item.count + 1 : 1 }
          : item
        )),
      };
    }
    case DECREMENT_ITEM: {
      const id = action.payload;
      return {
        ...state,
        items: state.items.map((item) => (item._id === id
          ? { ...item, count: item.count && item.count > 1 ? item.count - 1 : undefined }
          : item
        )),
      };
    }
    case CLEAR_COUNT: {
      return {
        ...state,
        items: state.items.map((item) => ({ ...item, count: undefined }))
      };
    }
    default:
      return state;
  }
};
