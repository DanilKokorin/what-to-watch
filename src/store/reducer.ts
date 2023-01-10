import { createReducer } from '@reduxjs/toolkit';
import { setGenre, getMoviesByGenre } from './action';
import { Movies } from '../mocks/movieType';
import { moviesMock } from '../mocks/moviesMock';

type MoviesReducerState = {
  genre: string;
  moviesByGenre: Movies;
};

const initialState: MoviesReducerState = {
  genre: '',
  moviesByGenre: [],
};

const moviesReducer = createReducer(initialState, (builder) => {
  builder.addCase(setGenre, (state, action) => {
    state.genre = action.payload;
  });
  builder.addCase(getMoviesByGenre, (state) => {
    state.moviesByGenre = moviesMock;

    if (state.genre !== 'All genres') {
      state.moviesByGenre = state.moviesByGenre.filter(
        (movie) => movie.genre === state.genre
      );
    }
  });
});

export { moviesReducer };
