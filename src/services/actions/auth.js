import api from '../api';

export const AUTH_PENDING = 'AUTH_PENDING';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_FULFILLED = 'AUTH_FULFILLED';

export const setLoading = () => ({
  type: AUTH_PENDING
});

export const setError = (err) => ({
  type: AUTH_ERROR,
  payload: err
});

export const setAuthData = (data) => ({
  type: AUTH_FULFILLED,
  payload: data
});

export const register = (email, password, name) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const { user, accessToken, refreshToken } = await api.auth.register(email, password, name);
    dispatch(setAuthData({ user, accessToken }));
    localStorage.setItem('refreshToken', refreshToken);
  } catch (err) {
    dispatch(setError(err.response));
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const { user, accessToken, refreshToken } = await api.auth.login(email, password);
    dispatch(setAuthData({ user, accessToken }));
    localStorage.setItem('refreshToken', refreshToken);
  } catch (err) {
    dispatch(setError(err.response));
  }
};

export const getUser = () => async (dispatch, getState) => {
  const { auth } = getState();
  if (!auth.accessToken) {
    return;
  }

  dispatch(setLoading());

  try {
    const { user } = await api.auth.get(auth.accessToken);
    dispatch(setAuthData({ ...auth, user }));
  } catch (err) {
    dispatch(setError(err.response));
  }
};

export const refresh = () => async (dispatch, getState) => {
  const { auth } = getState();

  const token = localStorage.getItem('refreshToken');
  if (!token) {
    return;
  }

  dispatch(setLoading());

  try {
    const { refreshToken, accessToken } = await api.auth.refresh(token);
    localStorage.setItem('refreshToken', refreshToken);

    dispatch(setAuthData({ ...auth, accessToken }));
  } catch (err) {
    dispatch(setError(err.response));
  }
};

export const logout = (cb) => async (dispatch) => {
  const token = localStorage.getItem('refreshToken');
  if (!token) {
    return;
  }

  dispatch(setLoading());

  try {
    await api.auth.logout(token);
    localStorage.removeItem('refreshToken');

    dispatch(setAuthData(null));
  } catch (err) {
    dispatch(setError(err.response));
  }

  if (cb) {
    cb();
  }
};

export const update = (data) => async (dispatch, getState) => {
  const { auth } = getState();
  if (!auth.accessToken) {
    return;
  }

  dispatch(setLoading());

  try {
    const { user } = await api.auth.update(auth.accessToken, data);
    dispatch(setAuthData({ ...auth, user }));
  } catch (err) {
    dispatch(setError(err.response));
  }
};
