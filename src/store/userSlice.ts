import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser, TuserDataTemp } from '../types/types';

const initialState: TUser = {
  id: NaN,
  username: '',
  telegram_nickname: '',
  email: '',
  first_name: '',
  is_team_lead: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: TUser, action: PayloadAction<TUser>) => ({
      ...state,
      ...action.payload,
    }),
    clearUser: (state: TUser) => ({
      ...state,
      ...initialState,
    }),
    setUserDataTemp: (
      state: TUser,
      action: PayloadAction<TuserDataTemp>
      // eslint-disable-next-line
    ) => ({ ...state, userDataTemp: action.payload }),

    clearUserDataTemp: (state: TUser) => ({
      ...state,
      userDataTemp: null,
    }),
  },
});

const userReducer = userSlice.reducer;
export const { setUser, clearUser, setUserDataTemp, clearUserDataTemp } =
  userSlice.actions;
export default userReducer;
