import {
  onLogin,
  onLogout,
  isLoadingOn,
  isLoadingOff,
  // isLocalLoadingOn,
  isLocalLoadingOff,
} from './systemSlice';
import { setUser, clearUser, setUserDataTemp } from './userSlice';

export {
  onLogin,
  onLogout,
  setUser,
  clearUser,
  setUserDataTemp,
  isLoadingOn,
  isLoadingOff,
  // isLocalLoadingOn,
  isLocalLoadingOff,
};
