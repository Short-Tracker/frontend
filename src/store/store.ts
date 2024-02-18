import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import createTaskReducer from './createTaskSlice';
import modalReducer from './modalSlice';
import systemReducer from './systemSlice';
import { taskMenuActiveReducer } from './taskMenuActiveSlice';
import taskReducer from './taskSlice';
import tasksReducer from './tasksSlice';
import { tasksOfUserSliceReducer } from './tasksOfUserSlice';
import userReducer from './userSlice';
import usersReducer from './usersSlice';
import contentReducer from './contentSlice';

const rootReducer = combineReducers({
  system: systemReducer,
  user: userReducer,
  task: taskReducer,
  tasks: tasksReducer,
  users: usersReducer,
  content: contentReducer,
  modals: modalReducer,
  createTask: createTaskReducer,
  taskMenuActive: taskMenuActiveReducer,
  tasksOfUser: tasksOfUserSliceReducer,
});
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['modals', 'taskMenuActive', 'createTask'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production',
});
export const persistor = persistStore(store);
export default store;
