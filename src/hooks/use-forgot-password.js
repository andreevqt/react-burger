import { useSelector, useDispatch } from 'react-redux';
import { getCode as getCodeAction, reset as resetAction } from '../services/actions/forgot-password';

const useForgotPassword = () => {
  const { isLoading, error, step } = useSelector((store) => ({
    isLoading: store.forgotPassword.isLoading,
    error: store.forgotPassword.error,
    step: store.forgotPassword.step
  }));

  const dispatch = useDispatch();
  const getCode = (email) => dispatch(getCodeAction(email));
  const reset = (password, token) => dispatch(resetAction(password, token));

  return {
    isLoading,
    error,
    step,
    getCode,
    reset
  };
};

export default useForgotPassword;
