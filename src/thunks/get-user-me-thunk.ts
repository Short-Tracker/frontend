import { batch } from 'react-redux';
import { isLoadingOff, isLoadingOn } from 'store';
import { setUserMe } from 'store/userSlice';
import { getUserMe } from 'api/api';
import { AppThunk } from '../types/store.types';
import { TUser } from '../types/types';
import catchErrors from '../api/catch-errors';

const getUserMeThunk: AppThunk = () => async (dispatch) => {
  try {
    dispatch(isLoadingOn());
    const res: TUser = await getUserMe();
    batch(() => {
      dispatch(setUserMe(res));
    });
  } catch (error: any) {
    catchErrors(error);
  } finally {
    dispatch(isLoadingOff);
  }
};

export default getUserMeThunk;
