import { useDispatch, useSelector } from 'react-redux';
import {
  login as loginAction,
  register as registerAction,
  getUser as getUserAction,
  logout as logoutAction,
  update as updateAction
} from '../services/actions/auth';

const useAuth = () => {
  const { user, isLoading } = useSelector(
    (store) => ({
      user: store.auth.user,
      isLoading: store.auth.isLoading
    })
  );

  const dispatch = useDispatch();

  const login = (email, password) => dispatch(loginAction(email, password));
  const register = (email, password, name) => dispatch(registerAction(email, password, name));
  const getUser = () => dispatch(getUserAction());
  const logout = (cb) => dispatch(logoutAction(cb));
  const update = (data) => dispatch(updateAction(data));

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
