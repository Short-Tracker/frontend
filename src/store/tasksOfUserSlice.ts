import { createSlice } from '@reduxjs/toolkit';

const initialState = { id: -1 };

const tasksOfUserSlice = createSlice({
  name: 'tasksOfUser',
  initialState,
  reducers: {
    getUserTasks: (state, { payload: { id } }: { payload: { id: number } }) => {
      state.id = id;
    },
    getAllTeamTasks: (state) => {
      state.id = initialState.id;
    },
  },
});

export const tasksOfUserSliceReducer = tasksOfUserSlice.reducer;
export const { getUserTasks, getAllTeamTasks } = tasksOfUserSlice.actions;
