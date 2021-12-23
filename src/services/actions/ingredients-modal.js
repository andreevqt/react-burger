export const SET_MODAL_CONTENT = 'SET_MODAL_CONTENT';

export const setModalContent = (ingredient) => ({
  type: SET_MODAL_CONTENT,
  payload: ingredient,
});
