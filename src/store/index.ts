import { onLogin, onLogout, isLoadingOn, isLoadingOff } from './systemSlice';
import { setUser, clearUser, setUserDataTemp } from './userSlice';
import { setUsers } from './usersSlice';
import { setTask } from './taskSlice';
import { openCreateTaskModal, openCreateTask, closeModal } from './modalSlice';
import { setCreateTask } from './createTaskSlice';

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
  openCreateTaskModal,
  openCreateTask,
  closeModal,
  setCreateTask,
};
