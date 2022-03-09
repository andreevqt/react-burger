import { TError } from '../api';
import { TSetLastErrorAction, SET_LAST_ERROR } from '../action-types/common';

export const setLastError = (err: TError | undefined): TSetLastErrorAction => ({
  type: SET_LAST_ERROR,
  payload: err
});
