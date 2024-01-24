import { batch } from 'react-redux';
import toast from 'react-hot-toast';
import { createTask } from '../api/api';
import { setCreateTask, isLoadingOn, isLoadingOff } from '../store';
import { AppThunk } from '../types/store.types';
import { TCreateTask } from '../types/types';

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
    const res: TCreateTask = await createTask(data);
    batch(() => {
      dispatch(setCreateTask(res));
    });
  } catch (error: any) {
    authErrors(error);
  } finally {
    dispatch(isLoadingOff());
  }
};
export default createTaskThunk;
