import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCreateTask } from 'types/types';

const initialState: TCreateTask = {
  description: '',
  status: 'to do',
  deadline_date: '2024-01-24',
  link: 'https://short-tracker.github.io/frontend/',
  performers: [0],
};

const createTaskSlice = createSlice({
  name: 'createTask',
  initialState,
  reducers: {
    setCreateTask: (state: TCreateTask, action: PayloadAction<TCreateTask>) => ({
      ...state,
      ...action.payload,
    }),
  },
});
const createTaskReducer = createTaskSlice.reducer;
export const { setCreateTask } = createTaskSlice.actions;
export default createTaskReducer;
