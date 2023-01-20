import { configureStore } from '@reduxjs/toolkit';
import { moviesReducer } from './reducer';

export const store = configureStore({
  reducer: moviesReducer,
});
