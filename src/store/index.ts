import { onLogin, onLogout, isLoadingOn, isLoadingOff } from './systemSlice';
import { setUser, clearUser, setUserDataTemp } from './userSlice';
import { setUsers } from './usersSlice';
import { setTask, updateTaskStore } from './taskSlice';
import { setTasks } from './tasksSlice';
import { openCreateTaskModal, openCreateTask, closeModal } from './modalSlice';
import { setCreateTask } from './createTaskSlice';
import { setContent } from './contentSlice';

export {
  onLogin,
  onLogout,
  setUser,
  clearUser,
  setUserDataTemp,
  isLoadingOn,
  isLoadingOff,
  setTask,
  setTasks,
  updateTaskStore,
  setUsers,
  openCreateTaskModal,
  openCreateTask,
  closeModal,
  setCreateTask,
  setContent,
};
