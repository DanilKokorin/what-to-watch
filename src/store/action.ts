import { createAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../constants';
import { Movies } from '../mocks/movieType';

export const Action = {
  SET_GENRE: 'SET_GENRE',
  GET_MOVIES_BY_GENRE: 'GET_MOVIES_BY_GENRE',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  FETCHING_MOVIES: 'FETCHING_MOVIES',
};

// server
export const loadMovies = createAction<Movies>('data/${Action.LOAD_MOVIES');

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

export const setCurrentPage = createAction(
  'page/${Action.SET_CURRENT_PAGE}',
  (value: number) => {
    return {
      payload: value,
    };
  }
);

export const requireAuthorization = createAction<AuthStatus>(
  'user/${Action.REQUIRE_AUTH}'
);

export const setError = createAction<string>('movies/setError');
