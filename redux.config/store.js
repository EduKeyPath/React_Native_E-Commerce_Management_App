import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../src/redux/reducers';

export default store = createStore(rootReducer, applyMiddleware(thunkMiddleware));