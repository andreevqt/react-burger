const reducer = (initialState) => (state, action) => {
  switch (action.type) {
    case 'set-ingredients':
      return {...state, ingredients: [...action.payload]};
    case 'reset':
      return initialState;
    case 'add':
      const toAdd = action.payload;
      if (toAdd.type === 'bun' && state.ingredients.some((item) => item.type === 'bun' && item.count)) {
        return state;
      }

      return {
        ...state,
        ingredients: state.ingredients.map((item) => (
          (item._id === toAdd._id)
            ? {...item, count: toAdd.count ? toAdd.count : typeof item.count !== 'undefined' ? item.count + 1 : 1}
            : item
        ))
      };
    case 'set-error':
      return {
        ...state, error: action.payload
      };
    case 'clear-error':
      return {
        ...state, error: null
      }
    default:
      return state;
  }
};

export default reducer;
