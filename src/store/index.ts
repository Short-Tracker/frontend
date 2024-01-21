import { onLogin, onLogout, isLoadingOn, isLoadingOff } from './systemSlice';
import { setUser, clearUser, setUserDataTemp } from './userSlice';
import { setUsers } from './usersSlice';
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
  setUsers,
};
