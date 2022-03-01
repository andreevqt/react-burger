import thunk, { ThunkAction } from 'redux-thunk';
import { useDispatch as dispatchHook, useSelector as selectorHook, TypedUseSelectorHook } from 'react-redux';
import { compose, createStore, applyMiddleware, Action, ActionCreator } from 'redux';
import error from '../middleware/error';
import ws from '../middleware/ws';
import rootReducer from '../reducers';
import { TConstructorActions } from '../actions/burger-constructor';
import { TForgotPasswordActions } from '../actions/forgot-password';
import { TIngredientActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';
import { TFeedActions } from '../actions/feed';
import { TOrderInfoActions } from '../actions/order-info';
import { THistoryActions } from '../actions/history';

type TApplicationActions =
  | TConstructorActions
  | TForgotPasswordActions
  | TIngredientActions
  | TOrderActions
  | TOrderInfoActions
  | TFeedActions
  | THistoryActions;

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(
  thunk,
  error,
  ws('wss://norma.nomoreparties.space/orders/all', 'FEED'),
  ws('wss://norma.nomoreparties.space/orders', 'HISTORY', true)
));

const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, unknown, TApplicationActions>
>;

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
