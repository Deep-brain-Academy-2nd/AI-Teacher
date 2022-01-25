import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import { combineReducers } from 'redux';
import aistudio from './modules/aistudio';
import user from './modules/user';

// Redux-persist를 통해 redux 상태값을 localstorage에 저장
export const rootReducer = combineReducers({
  aistudio,
  user,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['aistudio', 'user'],
};

export type RootState = ReturnType<typeof rootReducer>;
export const persitedReducer = persistReducer(persistConfig, rootReducer);
