import {
  CONSTRUCTOR_ADD_ITEM,
  CONSTRUCTOR_DELETE_ITEM,
  CONSTRUCTOR_RESET,
  CONSTRUCTOR_SWAP_ITEMS,
} from '../actions/burger-constructor';

const initialState = {
  bun: null,
  items: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CONSTRUCTOR_ADD_ITEM: {
      const item = action.payload;
      return item.type === 'bun' ? {
        ...state,
        bun: item,
      } : {
        ...state,
        items: [...state.items, item],
      };
    }
    case CONSTRUCTOR_DELETE_ITEM: {
      const idx = action.payload;
      return {
        ...state,
        items: state.items.filter((item, i) => i !== idx),
      };
    }
    case CONSTRUCTOR_SWAP_ITEMS: {
      const { dragIndex, hoverIndex } = action.payload;
      const cpy = [...state.items];
      const dragItem = cpy[dragIndex];
      cpy.splice(dragIndex, 1);
      cpy.splice(hoverIndex, 0, dragItem);
      return {
        ...state,
        items: cpy,
      };
    }
    case CONSTRUCTOR_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
