import { Middleware } from 'redux';
import { SET_LAST_ERROR } from '../action-types/common';
import { setLastError } from '../actions/common';

const error: Middleware = ({ dispatch, getState }) => (next) => (action) => {
  if (action.type === SET_LAST_ERROR || action.type.endsWith('ERROR')) {
    return next(action);
  }

  const { lastErr } = getState().common;
  if (lastErr) {
    dispatch(setLastError(undefined));
  }

  next(action);
};

export default error;
