import thunk, { ThunkAction } from 'redux-thunk';
import { useDispatch as dispatchHook, useSelector as selectorHook, TypedUseSelectorHook } from 'react-redux';
import { compose, createStore, applyMiddleware, Action, ActionCreator } from 'redux';
import error from '../middleware/error';
import rootReducer from '../reducers';
import { TConstructorActions } from '../actions/burger-constructor';
import { TForgotPasswordActions } from '../actions/forgot-password';
import { TIngredientActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';

type TApplicationActions =
  | TConstructorActions
  | TForgotPasswordActions
  | TIngredientActions
  | TOrderActions;

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, error));

const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, unknown, TApplicationActions>
>;

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
