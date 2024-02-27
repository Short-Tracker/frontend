import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TTasksAnalitics } from '../types/types';

const initialState: TTasksAnalitics = {
  total_tasks_on_time: 0,
  total_tasks_with_delay: 0,
  performers_analytics: [],
};

const taskAnaliticsSlice = createSlice({
  name: 'taskAnalitics',
  initialState,
  reducers: {
    getTaskAnalitics: (
      state: TTasksAnalitics,
      action: PayloadAction<TTasksAnalitics>
    ) => ({
      ...state,
      ...action.payload,
    }),
  },
});

const taskAnaliticsReducer = taskAnaliticsSlice.reducer;
export const { getTaskAnalitics } = taskAnaliticsSlice.actions;
export default taskAnaliticsReducer;
