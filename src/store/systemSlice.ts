import { createSlice } from '@reduxjs/toolkit';

type TSystemState = {
  isLoggedIn: boolean;
  isLoading: boolean;
  isLocalLoading: boolean;
};

const initialState: TSystemState = {
  isLoading: true,
  isLocalLoading: false,
  isLoggedIn: true,
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    isLoadingOn: (state: TSystemState) => ({ ...state, isLoading: true }),
    isLoadingOff: (state: TSystemState) => ({ ...state, isLoading: false }),
    // isLocalLoadingOn: (state: TSystemState) => ({ ...state, isLocalLoading: true }),
    isLocalLoadingOff: (state: TSystemState) => ({ ...state, isLocalLoading: false }),
    // onLogin: (state: TSystemState) => ({ ...state, isLoggedIn: true }),
    onLogin: (state: TSystemState) => ({ ...state, isLocalLoading: true }),
    onLogout: (state: TSystemState) => ({ ...state, isLoggedIn: false }),
  },
});

const systemReducer = systemSlice.reducer;
export const {
  isLoadingOn,
  isLoadingOff,
  // isLocalLoadingOn,
  isLocalLoadingOff,
  onLogin,
  onLogout,
} = systemSlice.actions;
export default systemReducer;
