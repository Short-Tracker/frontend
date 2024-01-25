import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TResults, TTask } from 'types/types';

const initialState: TTask = {
  count: 0,
  next: null,
  previous: null,
  results: [
    {
      id: 0,
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
    updateTaskStore(state, action: PayloadAction<TResults>) {
      // state.results[state.results.findIndex((elem: TResults) => elem['id'] == action.payload.id)] = action.payload,
      // ...action.payload,
      const elemIndex = state.results.findIndex(
        (elem: TResults) => elem.id === action.payload.id
      );
      state.results[elemIndex] = action.payload;
    },
  },
});
const taskReducer = taskSlice.reducer;
export const { setTask, updateTaskStore } = taskSlice.actions;
export default taskReducer;
