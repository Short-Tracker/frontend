import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: -1 };

const taskMenuActiveSlice = createSlice({
  name: 'taskMenuActive',
  initialState,
  reducers: {
    setActiveMenu: (state, { payload }: { payload: number }) => {
      state.value = payload;
    },
    resetActiveMenu: (state) => {
      state.value = initialState.value;
    },
  },
});

export const taskMenuActiveReducer = taskMenuActiveSlice.reducer;
export const { setActiveMenu, resetActiveMenu } = taskMenuActiveSlice.actions;
