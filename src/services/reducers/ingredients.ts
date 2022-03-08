import { TIngredient } from '../api';
import {
  GET_ITEMS_PENDING,
  GET_ITEMS_FULFILLED,
  GET_ITEMS_ERROR,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  TIngredientActions,
  CLEAR_COUNT
} from '../action-types/ingredients';

export type TIngredientsState = {
  isLoading: boolean;
  items: TIngredient[];
}

export const initialState: TIngredientsState = {
  isLoading: false,
  items: [],
};

const ingredients = (state = initialState, action: TIngredientActions): TIngredientsState => {
  switch (action.type) {
    case GET_ITEMS_PENDING: {
      return { ...state, isLoading: true };
    }
    case GET_ITEMS_FULFILLED: {
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      };
    }
    case GET_ITEMS_ERROR: {
      return initialState;
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

export default ingredients;
