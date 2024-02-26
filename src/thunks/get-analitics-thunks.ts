import { batch } from 'react-redux';
import { getAnalitics } from '../api/api';
import { isLoadingOn, isLoadingOff, getTaskAnalitics } from '../store';
import { AppThunk } from '../types/store.types';
import { TTasksAnalitics } from '../types/types';
import catchErrors from '../api/catch-errors';

const getAnaliticsThunk: AppThunk = (isLoggedIn: boolean) => async (dispatch) => {
  try {
    dispatch(isLoadingOn());
    if (isLoggedIn) {
      const res: TTasksAnalitics = await getAnalitics();
      batch(() => {
        dispatch(getTaskAnalitics(res));
      });
    }
  } catch (error: any) {
    catchErrors(error);
  } finally {
    dispatch(isLoadingOff());
  }
};

export default getAnaliticsThunk;
