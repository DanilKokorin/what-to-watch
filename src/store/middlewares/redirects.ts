import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../components/history-route/browser-history';
import { Middleware } from 'redux';
import { moviesReducer } from '../reducer';

type Reducer = ReturnType<typeof moviesReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) => (next) => (action: PayloadAction<string>) => {
    if (action.type === 'movie/redirectToRoute') {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
