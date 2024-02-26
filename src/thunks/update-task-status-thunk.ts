import { batch } from 'react-redux';
import { updateStoreTasksStatus } from 'store/tasksSlice';
import { updateTaskStatus } from '../api/api';
import catchErrors from '../api/catch-errors';
import { isLoadingOff, isLoadingOn } from '../store';
import { AppThunk } from '../types/store.types';
import { TUpdateTaskStatus } from '../types/types';

const updateTaskStatusThunk: AppThunk = (task: TUpdateTaskStatus) => async (dispatch) => {
  try {
    dispatch(isLoadingOn());
    const curTask = await updateTaskStatus(task);
    batch(() => {
      dispatch(
        updateStoreTasksStatus({ status: task.curStatus, newTask: curTask, id: task.id })
      );
    });
  } catch (error: any) {
    catchErrors(error);
  } finally {
    dispatch(isLoadingOff());
  }
};
export default updateTaskStatusThunk;
