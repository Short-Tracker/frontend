import { batch } from 'react-redux';
import toast from 'react-hot-toast';
import { authUser } from '../api/api';
import { onLogin, setUser, isLoadingOn, isLoadingOff } from '../store';
import { AppThunk } from '../types/store.types';
import { TUser } from '../types/types';

const loginUserThunk: AppThunk = (data) => async (dispatch) => {
  const authErrors = (error: any) => {
    toast(error, {
      duration: 3000,
      position: 'top-center',
      style: { fontSize: '18px' },
    });
  };
  try {
    dispatch(isLoadingOn());
    const res: TUser = await authUser(data);
    batch(() => {
      dispatch(onLogin());
      dispatch(setUser(res));
    });
    localStorage.setItem('userId', res.id.toString());
  } catch (error: any) {
    authErrors(error);
  } finally {
    dispatch(isLoadingOff());
  }
};
export default loginUserThunk;
