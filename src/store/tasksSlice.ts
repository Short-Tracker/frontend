import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TtaskState } from 'types/types';

const initialState: TtaskState = {
  toDo: null,
  inProgress: null,
  done: null,
  hold: null,
  count: 0,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state: TtaskState, action: PayloadAction<TtaskState>) => ({
      ...state,
      ...action.payload,
    }),
  },
});
const tasksReducer = tasksSlice.reducer;
export const { setTasks } = tasksSlice.actions;
export default tasksReducer;
