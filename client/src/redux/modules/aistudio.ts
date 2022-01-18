import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AiStudio } from '../../@types/aistudio';

export interface aiStudioState {
  aistudios: AiStudio;
}

const initialState: aiStudioState = {
  aistudios: {
    appId: 'aistudios.com',
    userKey: '6443234b-77d5-4013-bfd6-bb9399f317d9',
    uuid: '6443234b-77d5-4013-bfd6-bb9399f317d9',
    clientToken: '',
    token: '',
    key: '',
  },
};

export const aiStudioSlice = createSlice({
  name: 'aiStudio',
  initialState,
  reducers: {
    setAiStudioAppId: (state, { payload }: PayloadAction<string>) => {
      state.aistudios.appId = payload;
    },
    setAiStudioUserKey: (state, { payload }: PayloadAction<string>) => {
      state.aistudios.userKey = payload;
    },
    setAiStudioUuid: (state, { payload }: PayloadAction<string>) => {
      state.aistudios.uuid = payload;
    },
    setAiStudioClientToken: (state, { payload }: PayloadAction<string>) => {
      state.aistudios.clientToken = payload;
    },
    setAiStudioToken: (state, { payload }: PayloadAction<string>) => {
      state.aistudios.token = payload;
    },
    setAiStudioKey: (state, { payload }: PayloadAction<string>) => {
      state.aistudios.key = payload;
    },
  },
});

export const {
  setAiStudioAppId,
  setAiStudioUserKey,
  setAiStudioUuid,
  setAiStudioClientToken,
  setAiStudioToken,
  setAiStudioKey,
} = aiStudioSlice.actions;

export default aiStudioSlice.reducer;
