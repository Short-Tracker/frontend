import { createSlice } from '@reduxjs/toolkit';
import { TSystemState } from 'types/types';

const initialState: TSystemState = {
  isLoading: true,
  isLoggedIn: false,
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    isLoadingOn: (state: TSystemState) => ({ ...state, isLoading: true }),
    isLoadingOff: (state: TSystemState) => ({ ...state, isLoading: false }),
    onLogin: (state: TSystemState) => ({ ...state, isLoggedIn: true }),
    onLogout: (state: TSystemState) => ({ ...state, isLoggedIn: false }),
  },
});

const systemReducer = systemSlice.reducer;
export const { isLoadingOn, isLoadingOff, onLogin, onLogout } = systemSlice.actions;
export default systemReducer;
