import { useDispatch, useSelector } from '../services/store';

import { setLastError } from '../services/actions/common';

const useError = () => {
  const error = useSelector(
    (store) => {
      const err = store.common.lastErr

      return typeof err === 'object'
        ? (err.response ? err.response.message : err.message)
        : err;
    }
  );

  const dispatch = useDispatch();

  const clearError = () => {
    dispatch(setLastError(undefined));
  };

  return {
    error,
    clearError
  };
};

export default useError;
