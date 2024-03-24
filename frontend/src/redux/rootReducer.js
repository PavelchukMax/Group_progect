import { combineReducers } from 'redux';
import authReducer from './authSlice';
import bookReducer from './bookSlice';
import rentReducer from './rentSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
  rent : rentReducer
});

export default rootReducer;
