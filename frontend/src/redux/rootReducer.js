import { combineReducers } from 'redux';
import authReducer from './authSlice';
import bookReducer from './bookSlice';
import appointmentReducer from './appointmentSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
  appointment : appointmentReducer
});

export default rootReducer;
