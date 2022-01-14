import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface persistStorageState {
  value: number;
}

const initialState: persistStorageState = {
  value: 0,
};

export const persistStorageSlice = createSlice({
  name: 'persistStorage',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = persistStorageSlice.actions;

export default persistStorageSlice.reducer;
