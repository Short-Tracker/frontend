import { batch } from 'react-redux';
import toast from 'react-hot-toast';
import { getAllTasks } from '../api/api';
import { setTask, isLoadingOn, isLoadingOff } from '../store';
import { AppThunk } from '../types/store.types';
import { TTask } from '../types/types';

const getTaskThunk: AppThunk = (isLoggedIn: boolean) => async (dispatch) => {
  const getTaskErrors = (error: any) => {
    toast(`Ошибка: ${error.message}`, {
      duration: 3000,
      position: 'top-center',
      style: { fontSize: '18px', fontFamily: 'Onest, sans-serif' },
    });
  };
  try {
    dispatch(isLoadingOn());
    if (isLoggedIn) {
      const res: TTask = await getAllTasks();
      batch(() => {
        dispatch(setTask(res));
      });
    }
  } catch (error: any) {
    getTaskErrors(error);
  } finally {
    dispatch(isLoadingOff);
  }
};
export default getTaskThunk;
