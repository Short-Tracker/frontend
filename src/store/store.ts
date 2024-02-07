import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import createTaskReducer from './createTaskSlice';
import modalReducer from './modalSlice';
import systemReducer from './systemSlice';
import { taskMenuActiveReducer } from './taskMenuActiveSlice';
import taskReducer from './taskSlice';
import { tasksOfUserSliceReducer } from './tasksOfUserSlice';
import userReducer from './userSlice';
import usersReducer from './usersSlice';

const rootReducer = combineReducers({
  system: systemReducer,
  user: userReducer,
  task: taskReducer,
  users: usersReducer,
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
