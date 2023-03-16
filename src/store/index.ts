import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { createAPI } from '../api/apiClient';
import { redirect } from './middlewares/redirects';

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
