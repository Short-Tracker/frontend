import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import systemReducer from './systemSlice';
import userReducer from './userSlice';
import taskReducer from './taskSlice';
import usersReducer from './usersSlice';
import modalReducer from './modalSlice';

const store = configureStore({
  reducer: {
    system: systemReducer,
    user: userReducer,
    task: taskReducer,
    users: usersReducer,
    modals: modalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production',
});
export default store;
