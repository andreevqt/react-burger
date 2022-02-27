import { useDispatch, useSelector } from 'react-redux';

import { setError as setIngredientsError } from '../services/actions/ingredients';
import { setError as setOrderError } from '../services/actions/order';
import { setError as setAuthError } from '../services/actions/auth';
import { setError as setPasswordError } from '../services/actions/forgot-password';

const useError = () => {
  const error = useSelector(
    (store: any) => {
      const err = store.ingredients.error
        || store.order.error
        || store.auth.error
        || store.forgotPassword.error;

      if (!err) {
        return null;
      }

      return typeof err === 'object' ? err.message : err;
    }
  );

  const dispatch = useDispatch();

  const clearError = () => {
    dispatch(setIngredientsError(undefined));
    dispatch(setOrderError(undefined));
    dispatch(setAuthError(undefined));
    dispatch(setPasswordError(undefined));
  };

  return {
    error,
    clearError
  };
};

export default useError;
