import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from './promise-middleware';
import { loading, error } from '../components/app/reducers';
import { account, checkedAuth } from '../components/auth/reducers';
import { user } from '../components/profile/reducers';

const rootReducer = combineReducers({
  loading,
  error,
  user,
  account,
  checkedAuth
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      promiseMiddleware
    )
  )
);

export default store;