import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { getStatus } from 'services/functions';
import { TResults, TTask, TtaskState, TUpdateTaskStore } from 'types/types';

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
    setTasks: (state: TtaskState, { payload }: PayloadAction<TtaskState>) => ({
      ...state,
      ...payload,
    }),
    setNewTask: (state, { payload }: PayloadAction<TResults>) => {
      state.toDo?.results.unshift(payload);
    },
    updateStoreTasksStatus(state, { payload }: PayloadAction<TUpdateTaskStore>) {
      const { id, status, newTask } = payload;
      const curStatus = getStatus(status);
      const newStatus = getStatus(newTask.status);
      const curTasks = (current(state)[curStatus] as TTask).results;
      const index = curTasks.findIndex((task) => task.id === id);
      console.log(curTasks, status, newStatus, id);
      if (index === -1 || !current(state)[newStatus]) return;
      (state[curStatus] as TTask).results.splice(index, 1);
      (state[newStatus] as TTask).results.push(newTask);
    },
  },
});
const tasksReducer = tasksSlice.reducer;
export const { setTasks, updateStoreTasksStatus, setNewTask } = tasksSlice.actions;
export default tasksReducer;
