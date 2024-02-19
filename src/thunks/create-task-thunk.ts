import toast from 'react-hot-toast';
import { setNewTask } from 'store/tasksSlice';
import { createTask } from '../api/api';
import { isLoadingOff, isLoadingOn } from '../store';
import { AppThunk } from '../types/store.types';
import { TResults } from '../types/types';

const createTaskThunk: AppThunk = (data) => async (dispatch) => {
  const authErrors = (error: any) => {
    toast(error, {
      duration: 3000,
      position: 'top-center',
      style: { fontSize: '18px' },
    });
  };
  try {
    dispatch(isLoadingOn());
    const { tasks }: { tasks: TResults[] } = await createTask(data);
    dispatch(setNewTask(tasks[0]));
  } catch (error: any) {
    authErrors(error);
  } finally {
    dispatch(isLoadingOff());
  }
};
export default createTaskThunk;
