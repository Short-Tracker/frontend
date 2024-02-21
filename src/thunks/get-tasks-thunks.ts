import { batch } from 'react-redux';
import { handleCheckCount } from 'services/functions';
import {
  getDoneTask,
  getHoldTask,
  getInProgressTask,
  getTodoTask,
  getArchiveTask,
} from '../api/api';
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
        getArchiveTask(),
      ]).then(([todoTasks, inProgressTasks, doneTasks, holdTasks, archiveTasks]) => {
        batch(() => {
          dispatch(
            setTasks({
              toDo: todoTasks,
              inProgress: inProgressTasks,
              done: doneTasks,
              hold: holdTasks,
              archived: archiveTasks,
              count: handleCheckCount([
                todoTasks,
                inProgressTasks,
                doneTasks,
                holdTasks,
                archiveTasks,
              ]),
            })
          );
        });
      });
    }
  } catch (error: any) {
    catchErrors(error);
  } finally {
    dispatch(isLoadingOff);
  }
};
export default getTasksThunk;
