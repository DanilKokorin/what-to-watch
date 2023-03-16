import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import { MovieState } from '../../types/slices';
// import { MovieState } from '../../types/state';

const initialState: MovieState = {
  genre: '',
  movies: [],
  movie: [][0],
  moviesByGenre: [],
  isDataLoaded: false,
  totalCountMovies: 0,
  currentPage: 1,
  moviesPerPage: 8,
};

export const movieData = createSlice({
  name: NameSpace.movies,
  initialState,
  reducers: {
    loadMovie: (state, action) => {
      state.movie = action.payload;
    },
    loadMovies: (state, action) => {
      state.movies = action.payload;
      state.isDataLoaded = true;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    getMoviesByGenre: (state) => {
      state.moviesByGenre =
        state.genre === ''
          ? state.movies
          : state.movies.filter(
              (movie: any) => movie.attributes.genre === state.genre
            );

      state.totalCountMovies = state.moviesByGenre.length;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  loadMovie,
  loadMovies,
  setGenre,
  getMoviesByGenre,
  setCurrentPage,
} = movieData.actions;
