import { createReducer } from '@reduxjs/toolkit';
import {
  setGenre,
  getMoviesByGenre,
  setCurrentPage,
  loadMovies,
  requireAuthorization,
  setError,
} from './action';
import { Movies } from '../mocks/movieType';
import { AuthStatus } from '../constants';

type MoviesReducerState = {
  genre: string;
  movies: Movies;
  moviesByGenre: Movies;
  totalCountMovies: number;
  currentPage: number;
  moviesPerPage: number;
  authStatus: AuthStatus;
  error: string;
  isDataLoaded: boolean;
};

const initialState: MoviesReducerState = {
  genre: '',
  movies: [],
  moviesByGenre: [],
  totalCountMovies: 0,
  currentPage: 1,
  moviesPerPage: 8,
  authStatus: AuthStatus.Unknown,
  error: '',
  isDataLoaded: false,
};

const moviesReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadMovies, (state, action) => {
    state.movies = action.payload;
    state.isDataLoaded = true;
  });
  builder.addCase(setGenre, (state, action) => {
    state.genre = action.payload;
  });
  builder.addCase(getMoviesByGenre, (state) => {
    state.moviesByGenre =
      state.genre === ''
        ? state.movies
        : state.movies.filter(
            (movie: any) => movie.attributes.genre === state.genre
          );

    state.totalCountMovies = state.moviesByGenre.length;
  });
  builder.addCase(setCurrentPage, (state, action) => {
    state.currentPage = action.payload;
  });
  builder.addCase(requireAuthorization, (state, action) => {
    state.authStatus = action.payload;
  });
  builder.addCase(setError, (state, action) => {
    state.error = action.payload;
  });
});

export { moviesReducer };
