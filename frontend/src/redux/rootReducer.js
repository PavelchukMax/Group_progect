import { combineReducers } from 'redux';
import authReducer from './authSlice';
import patientReducer from './patientSlice';
import appointmentReducer from './appointmentSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  patient: patientReducer,
  appointment : appointmentReducer
});

export default rootReducer;
