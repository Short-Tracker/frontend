import { refreshAuthToken } from '../api/api';
import { AppThunk } from '../types/store.types';
import { onLogin, isLoadingOff } from '../store';
import catchErrors from '../api/catch-errors';

const refreshTokenThunk: AppThunk = (data) => async (dispatch) => {
  try {
    await refreshAuthToken(data);
    dispatch(isLoadingOff());
    dispatch(onLogin());
  } catch (error: any) {
    catchErrors(error);
  }
};

export default refreshTokenThunk;
