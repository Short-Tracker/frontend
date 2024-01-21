import { batch } from 'react-redux';
import toast from 'react-hot-toast';
import { getUsers } from '../api/api';
import { setUsers, isLoadingOn, isLoadingOff } from '../store';
import { AppThunk } from '../types/store.types';
import { Tusers } from '../types/types';

const getUsersThunk: AppThunk = (isLoggedIn: boolean) => async (dispatch) => {
  const getTaskErrors = (error: any) => {
    toast(error, {
      duration: 3000,
      position: 'top-center',
      style: { fontSize: '18px' },
    });
  };
  try {
    dispatch(isLoadingOn());
    if (isLoggedIn) {
      const res: Tusers = await getUsers();
      batch(() => {
        dispatch(setUsers(res));
      });
    }
  } catch (error: any) {
    getTaskErrors(error);
  } finally {
    dispatch(isLoadingOff);
  }
};

export default getUsersThunk;
