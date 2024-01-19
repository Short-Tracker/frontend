import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import systemReducer from './systemSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    system: systemReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production',
});
export default store;
