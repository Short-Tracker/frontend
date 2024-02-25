import { batch } from 'react-redux';
import { handleCheckCount } from 'services/functions';
import { getDoneTask, getHoldTask, getInProgressTask, getTodoTask } from '../api/api';
import { setTasks, isLoadingOn, isLoadingOff, clearTasksStore } from '../store';
import { AppThunk } from '../types/store.types';
import catchErrors from '../api/catch-errors';

interface IFormData {
  idValue: number;
  ifExpired: boolean;
  dateValue: string;
}

const getFilteredTasksThunk: AppThunk = (formData: IFormData) => async (dispatch) => {
  try {
    const { idValue, ifExpired, dateValue } = formData;
    dispatch(isLoadingOn());
    if (!(idValue === 0)) {
      const idSearchString = ``;

      dispatch(clearTasksStore());
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
    dispatch(clearTasksStore());
    Promise.all([getTodoTask(), getInProgressTask(), getDoneTask(), getHoldTask()]).then(
      ([todoTasks, inProgressTasks, doneTasks, holdTasks]) => {
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
      }
    );
  } catch (error: any) {
    catchErrors(error);
  } finally {
    dispatch(isLoadingOff());
  }
};
export default getFilteredTasksThunk;
