import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
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
        first_name: '',
        last_name: '',
        telegram_nickname: '',
        email: '',
        is_team_lead: null,
        first_name: '',
        last_name: '',
      },
      performer: {
        id: 0,
        full_name: '',
        telegram_nickname: '',
        email: '',
        is_team_lead: null,
      },

      is_expired: '',
      resolved_status: '',
    },
  ],
};

type TUpdateStore = {
  res: TResults;
  id: number;
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTask: (state: TTask, action: PayloadAction<TTask>) => ({
      ...state,
      ...action.payload,
    }),
    updateTaskStore(state, action: PayloadAction<TUpdateStore>) {
      const elemIndex = current(state).results.findIndex(
        (elem) => elem.id === Number(action.payload.id)
      );
      state.results[elemIndex].status = action.payload.res.status;
    },
  },
});
const taskReducer = taskSlice.reducer;
export const { setTask, updateTaskStore } = taskSlice.actions;
export default taskReducer;
