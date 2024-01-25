import { batch } from 'react-redux';
import { getAllTasks } from '../api/api';
import { setTask, isLoadingOn, isLoadingOff } from '../store';
import { AppThunk } from '../types/store.types';
import { TTask } from '../types/types';
import catchErrors from '../api/catch-errors';

const getTaskThunk: AppThunk = (isLoggedIn: boolean) => async (dispatch) => {
  try {
    dispatch(isLoadingOn());
    if (isLoggedIn) {
      const res: TTask = await getAllTasks();
      batch(() => {
        dispatch(setTask(res));
      });
    }
  } catch (error: any) {
    catchErrors(error);
  } finally {
    dispatch(isLoadingOff);
  }
};
export default getTaskThunk;
