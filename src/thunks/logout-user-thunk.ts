import { batch } from 'react-redux';
import { logoutUser } from '../api/api';
import { onLogout } from '../store';
import { AppThunk } from '../types/store.types';
import catchErrors from '../api/catch-errors';

const logoutUserThunk: AppThunk = (navigate: any) => async (dispatch) => {
  try {
    await logoutUser();
    batch(() => {
      dispatch(onLogout());
    });
    navigate('/');
  } catch (error: any) {
    catchErrors(error);
  }
};

export default logoutUserThunk;
