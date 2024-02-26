import { createNewUserApi } from '../api/api';
import { isLoadingOn, isLoadingOff } from '../store';
import { AppThunk } from '../types/store.types';
import catchErrors from '../api/catch-errors';

const createUserThunk: AppThunk = (data) => async (dispatch) => {
  try {
    dispatch(isLoadingOn());
    await createNewUserApi(data);
  } catch (error: any) {
    catchErrors(error);
  } finally {
    dispatch(isLoadingOff());
  }
};
export default createUserThunk;
