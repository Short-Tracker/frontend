import { onLogin, onLogout, isLoadingOn, isLoadingOff } from './systemSlice';
import { setUser, clearUser, setUserDataTemp } from './userSlice';
import { setTask } from './taskSlice';

export {
  onLogin,
  onLogout,
  setUser,
  clearUser,
  setUserDataTemp,
  isLoadingOn,
  isLoadingOff,
  setTask,
};
