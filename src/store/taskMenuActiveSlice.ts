import { createSlice } from '@reduxjs/toolkit';

const initialState = { id: -1 };

const taskMenuActiveSlice = createSlice({
  name: 'taskMenuActive',
  initialState,
  reducers: {
    setActiveMenu: (state, { payload }: { payload: number }) => {
      state.id = payload;
    },
    resetActiveMenu: (state) => {
      state.id = initialState.id;
    },
  },
});

export const taskMenuActiveReducer = taskMenuActiveSlice.reducer;
export const { setActiveMenu, resetActiveMenu } = taskMenuActiveSlice.actions;
