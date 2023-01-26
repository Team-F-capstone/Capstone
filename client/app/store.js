import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
// import authReducer from '../features/auth/authSlice';
import clientAuthSlice from '../features/auth/clientAuthSlice';
import freelanceAuthSlice from '../features/auth/freelanceAuthSlice'
import ClientRequestsSlice from '../features/requests/ClientRequests';

const store = configureStore({
  reducer: { 
    clientAuth: clientAuthSlice,
    freelanceAuth: freelanceAuthSlice,
    clientSlice: ClientRequestsSlice, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/clientAuthSlice';
