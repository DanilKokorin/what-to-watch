import { createReducer } from '@reduxjs/toolkit';
import {
  setGenre,
  getMoviesByGenre,
  setCurrentPage,
  isFetching,
} from './action';
import { Movies } from '../mocks/movieType';
import { moviesMock } from '../mocks/moviesMock';

type MoviesReducerState = {
  genre: string;
  movies: Movies;
  moviesByGenre: Movies;
  totalCountMovies: number;
  currentPage: number;
  moviesPerPage: number;
  isLoading: boolean;
};

const initialState: MoviesReducerState = {
  genre: '',
  movies: moviesMock,
  moviesByGenre: [],
  totalCountMovies: 0,
  currentPage: 1,
  moviesPerPage: 8,
  isLoading: false,
};

const moviesReducer = createReducer(initialState, (builder) => {
  builder.addCase(setGenre, (state, action) => {
    state.genre = action.payload;
  });
  builder.addCase(getMoviesByGenre, (state) => {
    state.moviesByGenre =
      state.genre === ''
        ? state.movies
        : state.movies.filter((movie) => movie.genre === state.genre);

    state.totalCountMovies = state.moviesByGenre.length;
  });
  builder.addCase(setCurrentPage, (state, action) => {
    state.currentPage = action.payload;
  });
  builder.addCase(isFetching, (state, action) => {
    state.isLoading = action.payload;
  });
});

export { moviesReducer };
