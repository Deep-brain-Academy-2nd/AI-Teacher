import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../@types/user";

const initialState: User = {
  token: "",
  email: "",
  userId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    setUserEmail: (state, { payload }: PayloadAction<string>) => {
      state.email = payload;
    },
    setUserId: (state, { payload }: PayloadAction<string>) => {
      state.userId = payload;
    },
  },
});

export const { setUserToken, setUserEmail, setUserId } = userSlice.actions;

export default userSlice.reducer;
