import { useDispatch, useSelector } from 'react-redux';
import { TUpdateProps } from '../services/api/stellar-burgers';
import {
  login as loginAction,
  register as registerAction,
  getUser as getUserAction,
  logout as logoutAction,
  update as updateAction
} from '../services/actions/auth';

const useAuth = () => {
  const { user, isLoading } = useSelector(
    (store: any) => ({
      user: store.auth.user,
      isLoading: store.auth.isLoading
    })
  );

  const dispatch = useDispatch();

  const login = (email: string, password: string) => dispatch(loginAction(email, password));
  const register = (email: string, password: string, name: string) => dispatch(registerAction(email, password, name));
  const getUser = () => dispatch(getUserAction());
  // TODO: fixme
  const logout = (cb: () => void) => dispatch(logoutAction(cb));
  const update = (data: TUpdateProps ) => dispatch(updateAction(data));

  return {
    login,
    logout,
    register,
    getUser,
    update,
    user,
    isLoading
  };
};

export default useAuth;
