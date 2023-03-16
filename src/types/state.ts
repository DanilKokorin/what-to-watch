import { Action, ThunkAction } from '@reduxjs/toolkit';
import { store } from '../store';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type TypedThunk<R = void> = ThunkAction<R, State, unknown, Action>;
