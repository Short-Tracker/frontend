import { batch } from 'react-redux';
import { updateTaskApi } from '../api/api';
import { isLoadingOn, isLoadingOff } from '../store';
import { AppThunk } from '../types/store.types';
import { TResults } from '../types/types';
import catchErrors from '../api/catch-errors';
import { updateTaskStore } from '../store/taskSlice';

const updateTaskThunk: AppThunk = (data) => async (dispatch) => {
  try {
    dispatch(isLoadingOn());
    const res: TResults = await updateTaskApi(data);
    batch(() => {
      dispatch(updateTaskStore(res));
    });
  } catch (error: any) {
    catchErrors(error);
  } finally {
    dispatch(isLoadingOff());
  }
};
export default updateTaskThunk;
