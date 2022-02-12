import { useSelector, useDispatch } from 'react-redux';
import { getCode as getCodeAction, reset as resetAction } from '../services/actions/forgot-password';

const useForgotPassword = () => {
  const { isLoading, error, step } = useSelector((store: any) => ({
    isLoading: store.forgotPassword.isLoading,
    error: store.forgotPassword.error,
    step: store.forgotPassword.step
  }));

  const dispatch = useDispatch();
  const getCode = (email: string) => dispatch(getCodeAction(email));
  const reset = (password: string, token: string) => dispatch(resetAction(password, token));

  return {
    isLoading,
    error,
    step,
    getCode,
    reset
  };
};

export default useForgotPassword;
