import toast from 'react-hot-toast';
import { refreshAuthToken } from '../api/api';
import { AppThunk } from '../types/store.types';
import { onLogin, isLoadingOff } from '../store';

const refreshTokenThunk: AppThunk = (data) => async (dispatch) => {
  const authErrors = (error: any) => {
    toast(`Ошибка: ${error.message}`, {
      duration: 3000,
      position: 'top-center',
      icon: '❌',
      style: { fontSize: '18px', fontFamily: 'Onest, sans-serif' },
    });
  };

  try {
    await refreshAuthToken(data);
    dispatch(isLoadingOff());
    dispatch(onLogin());
  } catch (error: any) {
    authErrors(error);
  }
};

export default refreshTokenThunk;
