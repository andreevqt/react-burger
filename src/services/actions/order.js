import api from '../api';

export const SUBMIT_ORDER_PENDING = 'SUBMIT_ORDER_PENDING';
export const SUBMIT_ORDER_FULFILLED = 'SUBMIT_ORDER_FULFILLED';
export const SUBMIT_ORDER_ERROR = 'SUBMIT_ORDER_ERROR';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export const setOrder = (order) => ({
  type: SUBMIT_ORDER_FULFILLED,
  payload: order,
});

export const setError = (err) => ({
  type: SUBMIT_ORDER_ERROR,
  payload: err,
});

export const setLoading = () => ({
  type: SUBMIT_ORDER_PENDING,
});

export const clearOrder = () => ({
  type: CLEAR_ORDER,
});

export const submitOrder = () => async (dispatch, getState) => {
  const { burgerConstructor: { bun, items }, order: { isLoading } } = getState();
  if (isLoading || !bun) {
    return;
  }

  const { accessToken } = getState().auth;
  if (!accessToken) {
    return;
  }

  dispatch(setLoading());

  const ingredients = [...items.map((item) => item._id), bun._id, bun._id];
  try {
    const result = await api.order.create(ingredients, accessToken);
    dispatch(setOrder({ name: result.name, id: result.order.number }));
  } catch (err) {
    dispatch(setError(err.message));
  }
};
