import { applyMiddleware, createStore, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

import { persistStore, persistReducer } from 'redux-persist';
import { rootReducer, persitedReducer } from '../redux/store';

// server-side 스토어와 client-side store를 합쳐준다.

const makeConfiguredStore = (reducer: any) =>
  createStore(reducer, undefined, applyMiddleware());
const makeStore = () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return makeConfiguredStore(rootReducer);
  } else {
    const store = makeConfiguredStore(persitedReducer);
    let persistor = persistStore(store);
    return { persistor, ...store };
  }
};

// wrapper 로 감싸기
export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});
