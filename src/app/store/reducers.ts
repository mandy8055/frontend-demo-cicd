import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './slices/api/apiSlice';
import authReducer from './slices/authSlice';
import dateReducer from './slices/dateSlice';
import portfolioReducer from './slices/portfolioSlice';
import welcomeReducer from './slices/welcomeSlice';
const rootReducer = combineReducers({
  welcome: welcomeReducer,
  auth: authReducer,
  portfolio: portfolioReducer,
  date: dateReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
