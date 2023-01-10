import { createAction } from '@reduxjs/toolkit';

export const Action = {
  SET_GENRE: 'SET_GENRE',
  GET_MOVIES_BY_GENRE: 'GET_MOVIES_BY_GENRE',
};

export const setGenre = createAction(
  'movie/${Action.SET_GENRE}',
  (value: string) => {
    return {
      payload: value,
    };
  }
);

export const getMoviesByGenre = createAction(Action.GET_MOVIES_BY_GENRE);
