import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '.';
import { apiClient, getMovies } from '../api/apiClient';
import { errorHandle } from '../api/error-handle';
import { dropToken, saveToken } from '../api/token';
import { APIRoute, AuthStatus, TIMEOUT_SHOW_ERROR } from '../constants';
import { Movies } from '../mocks/movieType';
import { loadMovies, requireAuthorization, setError } from './action';

export const fetchMoviesAction = createAsyncThunk(
  'data/fetchMovies',
  async () => {
    try {
      const data = await getMovies(APIRoute.Movies);
      store.dispatch(loadMovies(data as Movies));
    } catch (error) {
      errorHandle(error);
    }
  }
);

export const checkAuthStatus = createAsyncThunk('user/checkAuth', async () => {
  try {
    await apiClient.get(APIRoute.Login);
    store.dispatch(requireAuthorization(AuthStatus.Auth));
  } catch (error) {
    errorHandle(error);
    store.dispatch(requireAuthorization(AuthStatus.NoAuth));
  }
});

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  id: number;
  email: string;
  token: string;
};

export const loginAction = createAsyncThunk(
  'user/login',
  async ({ login: email, password }: AuthData) => {
    try {
      const {
        data: { token },
      } = await apiClient.post<UserData>(APIRoute.Login, { email, password });

      saveToken(token);

      store.dispatch(requireAuthorization(AuthStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthStatus.NoAuth));
    }
  }
);

export const logoutAction = createAsyncThunk('user/logout', async () => {
  try {
    await apiClient.delete(APIRoute.Logout);
    dropToken();
    store.dispatch(requireAuthorization(AuthStatus.NoAuth));
  } catch (error) {
    errorHandle(error);
  }
});

export const clearErrorAction = createAsyncThunk('movies/clearError', () => {
  setTimeout(() => store.dispatch(setError('')), TIMEOUT_SHOW_ERROR);
});
