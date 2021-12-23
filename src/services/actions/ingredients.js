import api from '../api';

export const GET_ITEMS_PENDING = 'GET_ITEMS_PENDING';
export const GET_ITEMS_FULFILLED = 'GET_ITEMS_FULFILLED';
export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';
export const INCREMENT_ITEM = 'INCREMENT_ITEM';
export const DECREMENT_ITEM = 'DECREMENT_ITEM';

export const setItems = (items) => ({
  type: GET_ITEMS_FULFILLED,
  payload: items,
});

export const setError = (err) => ({
  type: GET_ITEMS_ERROR,
  payload: err,
});

export const setLoading = () => ({
  type: GET_ITEMS_PENDING,
});

export const getItems = () => async (dispatch, getState) => {
  dispatch(setLoading());

  const { isLoading } = getState().ingredients;
  if (!isLoading) {
    return;
  }

  try {
    const items = await api.ingredients.list();
    dispatch(setItems(items));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const increment = (id) => ({ type: INCREMENT_ITEM, payload: id });

export const decrement = (id) => ({ type: DECREMENT_ITEM, payload: id });
