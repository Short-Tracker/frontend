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
import contentReducer from './contentSlice';
import createTaskReducer from './createTaskSlice';
import modalReducer from './modalSlice';
import systemReducer from './systemSlice';
import { taskMenuActiveReducer } from './taskMenuActiveSlice';
import { tasksOfUserSliceReducer } from './tasksOfUserSlice';
import tasksReducer from './tasksSlice';
import userReducer from './userSlice';
import usersReducer from './usersSlice';
import taskAnaliticsReducer from './taskAnaliticsSlice';

const rootReducer = combineReducers({
  system: systemReducer,
  user: userReducer,
  tasks: tasksReducer,
  users: usersReducer,
  content: contentReducer,
  modals: modalReducer,
  createTask: createTaskReducer,
  taskMenuActive: taskMenuActiveReducer,
  tasksOfUser: tasksOfUserSliceReducer,
  taskAnalitics: taskAnaliticsReducer,
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
