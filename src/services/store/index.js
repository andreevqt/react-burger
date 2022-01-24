import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import error from '../middleware/error';
import jwt from '../middleware/jwt';
import rootReducer from '../reducers';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(jwt, thunk, error));

export default createStore(rootReducer, enhancer);
