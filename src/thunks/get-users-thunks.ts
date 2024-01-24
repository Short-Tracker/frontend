import { batch } from 'react-redux';
import { getUsers } from '../api/api';
import { setUsers, isLoadingOn, isLoadingOff } from '../store';
import { AppThunk } from '../types/store.types';
import { Tusers } from '../types/types';
import catchErrors from '../api/catch-errors';

const getUsersThunk: AppThunk = (isLoggedIn: boolean) => async (dispatch) => {
  try {
    dispatch(isLoadingOn());
    if (isLoggedIn) {
      const res: Tusers = await getUsers();
      batch(() => {
        dispatch(setUsers(res));
      });
    }
  } catch (error: any) {
    catchErrors(error);
  } finally {
    dispatch(isLoadingOff);
  }
};

export default getUsersThunk;
