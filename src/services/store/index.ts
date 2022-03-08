import thunk, { ThunkAction } from 'redux-thunk';
import { useDispatch as dispatchHook, useSelector as selectorHook, TypedUseSelectorHook } from 'react-redux';
import { compose, createStore, applyMiddleware, ActionCreator } from 'redux';
import error from '../middleware/error';
import ws from '../middleware/ws';
import rootReducer from '../reducers';
import { TAuthActions } from '../action-types/auth';
import { TConstructorActions } from '../action-types/burger-constructor';
import { TForgotPasswordActions } from '../action-types/forgot-password';
import { TIngredientActions } from '../action-types/ingredients';
import { TOrderActions } from '../action-types/order';
import { TFeedActions } from '../action-types/feed';
import { TOrderInfoActions } from '../action-types/order-info';
import { THistoryActions } from '../action-types/history';
import { TCommonActions } from '../action-types/common';

type TApplicationActions =
  | TConstructorActions
  | TForgotPasswordActions
  | TIngredientActions
  | TOrderActions
  | TOrderInfoActions
  | TFeedActions
  | THistoryActions
  | TCommonActions
  | TAuthActions;

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
