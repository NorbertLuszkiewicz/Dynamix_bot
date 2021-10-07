import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { userReducer } from 'reducers';
import thunk from 'redux-thunk';

const initialState = { account: null };
const reducer = combineReducers({
  user: userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;
