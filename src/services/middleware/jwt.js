/* eslint-disable */
import parseJwt from '../../utils/parse-jwt';
import { refresh } from '../actions/auth';

const isExpired = (token) => {
  const splited = token.split(' ')[1];
  const { exp } = parseJwt(splited);
  const current = Date.now() / 1000;
  return current > exp;
};

const jwt = ({ getState, dispatch }) => (next) => (action) => {
  if (typeof action === 'function') {
    const { accessToken } = getState().auth;
    if (accessToken) {
      // accessToken is present, checking for expiration 
      if (isExpired(accessToken)) {
        refresh()(dispatch, getState).then(() => next(action));
        return;
      };
    } else {
      // no accessToken, trying to get new
      refresh()(dispatch, getState).then(() => next(action));
      return;
    }
  }

  next(action);
};

export default jwt;
