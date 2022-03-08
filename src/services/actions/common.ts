import { TError } from '../api';

export const SET_LAST_ERROR: 'SET_LAST_ERROR' = 'SET_LAST_ERROR';

export type TSetLastErrorAction = {
  readonly type: typeof SET_LAST_ERROR;
  readonly payload: TError | undefined;
};

export type TCommonActions = TSetLastErrorAction;

export const setLastError = (err: TError | undefined): TSetLastErrorAction => ({
  type: SET_LAST_ERROR,
  payload: err
});
