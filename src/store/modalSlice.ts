import { createSlice } from '@reduxjs/toolkit';

type TSystemState = {
  createTaskModal: boolean;
  createTask: boolean;
};

const initialState: TSystemState = {
  createTaskModal: false,
  createTask: false,
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openCreateTaskModal: (state: TSystemState) => ({
      ...state,
      createTaskModal: true,
    }),
    openCreateTask: (state: TSystemState) => ({
      ...state,
      createTask: true,
    }),
    closeModal: (state: TSystemState) => ({
      ...state,
      ...initialState,
    }),
  },
});

const modalReducer = modalSlice.reducer;

export const { openCreateTaskModal, openCreateTask, closeModal } = modalSlice.actions;
export default modalReducer;
