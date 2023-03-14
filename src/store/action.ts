import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthStatus } from '../constants';
import { Movie } from '../mocks/movieType';
import { Comment } from '../mocks/commentType';

export const Action = {
  LOAD_MOVIES: 'LOAD_MOVIES',
  LOAD_MOVIE: 'LOAD_MOVIE',
  LOAD_MOVIE_ERROR: 'LOAD_MOVIE_ERROR',
  SET_GENRE: 'SET_GENRE',
  GET_MOVIES_BY_GENRE: 'GET_MOVIES_BY_GENRE',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  REQUIRE_AUTH: 'REQUIRE_AUTH',
  LOAD_COMMENTS: 'LOAD_COMMENTS',
  COMMENT_SENDED: 'COMMENT_SENDED',
  SET_RATING: 'SET_RATING',
};

// server
export const loadMovies = createAction<Movie[]>(`data/${Action.LOAD_MOVIES}`);
export const loadMovie = createAction<Movie>(`data/${Action.LOAD_MOVIE}`);
export const loadComments = createAction<Comment[]>(
  `data/${Action.LOAD_COMMENTS}`
);

export const commentSended = createAction<boolean>(
  `data/${Action.COMMENT_SENDED}`
);

export const setRating = createAction<number>(`data/${Action.SET_RATING}`);

export const setErrorMovieLoading = createAction<boolean>(
  'data/${Action.LOAD_MOVIE_ERROR'
);

export const setGenre = createAction(
  `genre/${Action.SET_GENRE}`,
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

export const redirectToRoute = createAction<AppRoute>('movie/redirectToRoute');

export const setUser = createAction('user/setUser', (value: string) => {
  return {
    payload: value,
  };
});
