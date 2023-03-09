import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { api, store } from '.';
import { errorHandle } from '../api/error-handle';
import { dropToken, getToken, saveToken } from '../api/token';
import { AppRoute, APIRoute, AuthStatus } from '../constants';
import { loadMovies, redirectToRoute, requireAuthorization } from './action';
import { Movies } from '../mocks/movieType';
import { AuthData, UserData } from '../types/data';

async function getMovies(url: string): Promise<Movies | AxiosError> {
  try {
    return api
      .get<Movies>(process.env.REACT_APP_API_URL + url)
      .then((res: AxiosResponse) => res.data.data);
  } catch (e: any) {
    const error = e as AxiosError;
    return error;
  }
}

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
  // try {
  //   await api.get(process.env.REACT_APP_API_URL + APIRoute.LoginCheker);
  //   store.dispatch(requireAuthorization(AuthStatus.Auth));
  // } catch (error) {
  //   errorHandle(error);
  //   store.dispatch(requireAuthorization(AuthStatus.NoAuth));
  // }

  if (getToken()) {
    store.dispatch(requireAuthorization(AuthStatus.Auth));
    alert(store.getState().user);
  }
});

export const loginAction = createAsyncThunk(
  'user/login',
  async ({ identifier, password }: AuthData) => {
    try {
      const {
        data: { jwt },
      } = await api.post<UserData>(
        process.env.REACT_APP_API_URL + APIRoute.Login,
        {
          identifier,
          password,
        }
      );

      saveToken(jwt);

      store.dispatch(requireAuthorization(AuthStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthStatus.NoAuth));
    }
  }
);

export const logoutAction = createAsyncThunk('user/logout', async () => {
  try {
    // await api.delete(APIRoute.Logout);
    dropToken();
    store.dispatch(requireAuthorization(AuthStatus.NoAuth));
    store.dispatch(redirectToRoute(AppRoute.Main));
  } catch (error) {
    errorHandle(error);
  }
});
