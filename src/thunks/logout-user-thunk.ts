import { batch } from 'react-redux';
import toast from 'react-hot-toast';
import { logoutUser } from '../api/api';
import { onLogout } from '../store';
import { AppThunk } from '../types/store.types';

const logoutUserThunk: AppThunk = (navigate: any) => async (dispatch) => {
  const authErrors = (error: any) => {
    toast(`Ошибка: ${error.message}`, {
      duration: 3000,
      position: 'top-center',
      icon: '❌',
      style: { fontSize: '18px', fontFamily: 'Onest, sans-serif' },
    });
  };
  try {
    await logoutUser();
    batch(() => {
      dispatch(onLogout());
    });
    navigate('/');
  } catch (error: any) {
    authErrors(error);
  }
};

export default logoutUserThunk;
