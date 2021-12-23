export const CONSTRUCTOR_ADD_ITEM = 'CONSTRUCTOR_ADD_ITEM';
export const CONSTRUCTOR_DELETE_ITEM = 'CONSTRUCTOR_DELETE_ITEM';
export const CONSTRUCTOR_SWAP_ITEMS = 'CONSTRUCTOR_SWAP_ITEMS';

export const swapItems = (dragIndex, hoverIndex) => ({
  type: CONSTRUCTOR_SWAP_ITEMS,
  payload: { dragIndex, hoverIndex },
});

export const addItem = (item) => ({
  type: CONSTRUCTOR_ADD_ITEM,
  payload: item,
});

export const deleteItem = (idx) => ({
  type: CONSTRUCTOR_DELETE_ITEM,
  payload: idx,
});
