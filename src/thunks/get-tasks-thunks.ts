import { batch } from 'react-redux';
import { handleCheckCount } from 'services/functions';
import { getDoneTask, getHoldTask, getInProgressTask, getTodoTask } from '../api/api';
import { setTasks, isLoadingOn, isLoadingOff } from '../store';
import { AppThunk } from '../types/store.types';
import catchErrors from '../api/catch-errors';

const getTasksThunk: AppThunk = (isLoggedIn: boolean) => async (dispatch) => {
  try {
    dispatch(isLoadingOn());
    if (isLoggedIn) {
      Promise.all([
        getTodoTask(),
        getInProgressTask(),
        getDoneTask(),
        getHoldTask(),
      ]).then(([todoTasks, inProgressTasks, doneTasks, holdTasks]) => {
        batch(() => {
          dispatch(
            setTasks({
              toDo: todoTasks,
              inProgress: inProgressTasks,
              done: doneTasks,
              hold: holdTasks,
              count: handleCheckCount([todoTasks, inProgressTasks, doneTasks, holdTasks]),
            })
          );
        });
      });
    }
  } catch (error: any) {
    catchErrors(error);
  } finally {
    dispatch(isLoadingOff());
  }
};
export default getTasksThunk;
