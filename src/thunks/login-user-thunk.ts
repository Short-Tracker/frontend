import { batch } from 'react-redux';
import { authUser } from '../api/api';
import { onLogin, setUser, isLoadingOn, isLoadingOff } from '../store';
import { AppThunk } from '../types/store.types';
import { TUser } from '../types/types';
import catchErrors from '../api/catch-errors';

const loginUserThunk: AppThunk = (data) => async (dispatch) => {
  try {
    dispatch(isLoadingOn());
    const res: TUser = await authUser(data);
    batch(() => {
      dispatch(onLogin());
      dispatch(setUser(res));
    });
    localStorage.setItem('userId', res.id.toString());
  } catch (error: any) {
    catchErrors(error);
  } finally {
    dispatch(isLoadingOff());
  }
};

export default loginUserThunk;
