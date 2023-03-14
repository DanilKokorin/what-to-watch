import { createReducer } from '@reduxjs/toolkit';
import {
  setGenre,
  getMoviesByGenre,
  setCurrentPage,
  loadMovies,
  requireAuthorization,
  setUser,
  loadComments,
  commentSended,
  loadMovie,
  setErrorMovieLoading,
  setRating,
} from './action';
import { Movie } from '../mocks/movieType';
import { AuthStatus } from '../constants';
import { Comment } from '../mocks/commentType';

type MoviesReducerState = {
  genre: string;
  movies: Movie[];
  movie: any;
  errorMovieLoading: boolean;
  moviesByGenre: Movie[];
  totalCountMovies: number;
  currentPage: number;
  moviesPerPage: number;
  authStatus: AuthStatus;
  isDataLoaded: boolean;
  user: string;
  comments: Comment[];
  // comments: any[];
  isCommentLoaded: boolean;
  isCommentSended: boolean;
  rating: number;
};

const initialState: MoviesReducerState = {
  genre: '',
  movies: [],
  movie: [][0],
  errorMovieLoading: false,
  moviesByGenre: [],
  totalCountMovies: 0,
  currentPage: 1,
  moviesPerPage: 8,
  authStatus: AuthStatus.Unknown,
  isDataLoaded: false,
  user: '',
  comments: [],
  isCommentLoaded: false,
  isCommentSended: false,
  rating: 0,
};

const moviesReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadMovies, (state, action) => {
    state.movies = action.payload;
    state.isDataLoaded = true;
  });
  builder.addCase(setErrorMovieLoading, (state, action) => {
    state.errorMovieLoading = action.payload;
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
  builder.addCase(setUser, (state, action) => {
    state.user = action.payload;
  });
  builder.addCase(loadMovie, (state, action) => {
    state.movie = action.payload;
  });
  builder.addCase(loadComments, (state, action) => {
    state.comments = action.payload;
    state.isCommentLoaded = true;
  });
  builder.addCase(commentSended, (state, action) => {
    state.isCommentSended = action.payload;
  });
  builder.addCase(setRating, (state, action) => {
    state.rating = action.payload;
  });
});

export { moviesReducer };
