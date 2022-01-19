import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../@types/user';

const initialState: User = {
  token: '',
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    setUserEmail: (state, { payload }: PayloadAction<string>) => {
      state.email = payload;
    },
  },
});

export const { setUserToken, setUserEmail } = userSlice.actions;

export default userSlice.reducer;
