import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import createTaskReducer from './createTaskSlice';
import modalReducer from './modalSlice';
import systemReducer from './systemSlice';
import { taskMenuActiveReducer } from './taskMenuActiveSlice';
import taskReducer from './taskSlice';
import { tasksOfUserSliceReducer } from './tasksOfUserSlice';
import userReducer from './userSlice';
import usersReducer from './usersSlice';

const store = configureStore({
  reducer: {
    system: systemReducer,
    user: userReducer,
    task: taskReducer,
    users: usersReducer,
    modals: modalReducer,
    createTask: createTaskReducer,
    taskMenuActive: taskMenuActiveReducer,
    tasksOfUser: tasksOfUserSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production',
});
export default store;
