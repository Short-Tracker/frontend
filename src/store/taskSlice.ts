import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTask } from 'types/types';

const initialState: TTask = {
  count: 0,
  next: null,
  previous: null,
  results: [
    {
      description: '',
      status: '',
      create_date: '',
      inprogress_date: '',
      done_date: '',
      deadline_date: '',
      archive_date: '',
      link: '',
      creator: {
        id: 0,
        full_name: '',
        telegram_nickname: '',
        email: '',
        is_team_lead: null,
      },
      performers: [
        {
          id: 0,
          full_name: '',
          telegram_nickname: '',
          email: '',
          is_team_lead: null,
        },
      ],
      is_expired: '',
      resolved_status: '',
    },
  ],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTask: (state: TTask, action: PayloadAction<TTask>) => ({
      ...state,
      ...action.payload,
    }),
  },
});
const taskReducer = taskSlice.reducer;
export const { setTask } = taskSlice.actions;
export default taskReducer;
