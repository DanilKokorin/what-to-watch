import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../api/apiClient';
import { redirect } from './middlewares/redirects';
import { moviesReducer } from './reducer';

export const api = createAPI();

export const store = configureStore({
  reducer: moviesReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
