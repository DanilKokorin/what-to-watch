import { createAction } from '@reduxjs/toolkit';

export const Action = {
  SET_GENRE: 'SET_GENRE',
  GET_MOVIES_BY_GENRE: 'GET_MOVIES_BY_GENRE',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  FETCHING_MOVIES: 'FETCHING_MOVIES',
};

export const setGenre = createAction(
  'genre/${Action.SET_GENRE}',
  (value: string) => {
    return {
      payload: value,
    };
  }
);

export const getMoviesByGenre = createAction(
  'movies/${Action.GET_MOVIES_BY_GENRE}'
);

export const isFetching = createAction(
  'movies/${Action.FETCHING_MOVIES}',
  (value: boolean) => {
    return {
      payload: value,
    };
  }
);

export const setCurrentPage = createAction(
  'page/${Action.SET_CURRENT_PAGE}',
  (value: number) => {
    return {
      payload: value,
    };
  }
);
