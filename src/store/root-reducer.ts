import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../constants';
import { errorProcess } from './error-process/error-process';
import { favoritesData } from './favorites-data/favorites-data';
import { movieData } from './movie-data/movie-data';
import { reviewData } from './review-data/review-data';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.user]: userProcess.reducer,
  [NameSpace.movies]: movieData.reducer,
  [NameSpace.reviews]: reviewData.reducer,
  [NameSpace.errors]: errorProcess.reducer,
  [NameSpace.favorites]: favoritesData.reducer,
});
