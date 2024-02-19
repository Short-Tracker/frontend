import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TContent } from '../types/types';

const initialState: TContent = {
  currentContent: 'objectives',
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setContent: (state: TContent, action: PayloadAction<TContent>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

const contentReducer = contentSlice.reducer;
export const { setContent } = contentSlice.actions;
export default contentReducer;
