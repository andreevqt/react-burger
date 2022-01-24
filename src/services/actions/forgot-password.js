import api from '../api';

export const FORGOT_PASSWORD_FULFILLED = 'FORGOT_PASSWORD_FULFILLED';
export const FORGOT_PASSWORD_PENDING = 'FORGOT_PASSWORD_PENDING';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

export const Step = {
  CODE: 'CODE',
  RESET: 'RESET'
};

export const setStep = () => ({
  type: FORGOT_PASSWORD_FULFILLED
});

export const setLoading = () => ({
  type: FORGOT_PASSWORD_PENDING
});

export const setError = (err) => ({
  type: FORGOT_PASSWORD_ERROR,
  payload: err
});

export const getCode = (email) => async (dispatch) => {
  dispatch(setLoading());
  try {
    await api.password.getCode(email);
    dispatch(setStep());
  } catch (err) {
    dispatch(setError(err.response));
  }
};

export const reset = (password, token) => async (dispatch) => {
  dispatch(setLoading());
  try {
    await api.password.reset(password, token);
    dispatch(setStep());
  } catch (err) {
    dispatch(setError(err.response));
  }
};
