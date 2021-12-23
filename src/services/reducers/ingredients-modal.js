import { SET_MODAL_CONTENT } from '../actions/ingredients-modal';

const initialState = {
  content: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_MODAL_CONTENT: {
      const content = action.payload;
      return {
        ...state,
        content,
      };
    }
    default: {
      return state;
    }
  }
};
