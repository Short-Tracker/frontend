import { setContent } from './contentSlice';
import { setCreateTask } from './createTaskSlice';
import { closeModal, openCreateTask, openCreateTaskModal } from './modalSlice';
import { isLoadingOff, isLoadingOn, onLogin, onLogout } from './systemSlice';
import { setTasks } from './tasksSlice';
import { clearUser, setUser, setUserDataTemp } from './userSlice';
import { setUsers } from './usersSlice';
import { getTaskAnalitics } from './taskAnaliticsSlice';

export {
  clearUser,
  closeModal,
  isLoadingOff,
  isLoadingOn,
  onLogin,
  onLogout,
  openCreateTask,
  openCreateTaskModal,
  setContent,
  setCreateTask,
  setTasks,
  setUser,
  setUserDataTemp,
  setUsers,
  getTaskAnalitics,
};
