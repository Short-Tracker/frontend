import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tusers } from '../types/types';

const initialState: Tusers = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state: Tusers, action: PayloadAction<Tusers>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

const usersReducer = usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
export default usersReducer;
