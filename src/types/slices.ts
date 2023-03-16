import { AuthStatus } from '../constants';
import { Movie } from '../mocks/movieType';
import { Comment } from '../mocks/commentType';

export type UserProcess = {
  user: string;
  authStatus: AuthStatus;
};

export type MovieState = {
  genre: string;
  movies: Movie[];
  movie: any;
  moviesByGenre: Movie[];
  isDataLoaded: boolean;
  totalCountMovies: number;
  currentPage: number;
  moviesPerPage: number;
};

export type ReviewState = {
  comments: Comment[];
  isCommentLoaded: boolean;
  isCommentSended: boolean;
  rating: number;
};

export type ErrorProcess = {
  errorMovieLoading: boolean;
};
