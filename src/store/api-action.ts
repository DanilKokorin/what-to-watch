import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { api, store } from '.';
import { errorHandle } from '../api/error-handle';
import { dropToken, getToken, saveToken } from '../api/token';
import { AppRoute, APIRoute, AuthStatus } from '../constants';
import {
  loadComments,
  loadMovie,
  loadMovies,
  redirectToRoute,
  requireAuthorization,
  setErrorMovieLoading,
} from './action';
import { Movie } from '../mocks/movieType';
import { AuthData, UserData } from '../types/data';
import { AddComment } from '../types/AddComment';
import { Comment } from '../mocks/commentType';

async function getMovies(url: string): Promise<Movie[] | AxiosError> {
  try {
    return api
      .get<Movie[]>(process.env.REACT_APP_API_URL + url)
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
      store.dispatch(loadMovies(data as Movie[]));
    } catch (error) {
      errorHandle(error);
    }
  }
);

export const fetchMovieAction = createAsyncThunk(
  'data/fetchMovie',
  async (id: string | number | undefined) => {
    try {
      const data = await api
        .get<Movie>(
          process.env.REACT_APP_API_URL + `${APIRoute.Movie}/${id}?populate=*`
        )
        .then((res: AxiosResponse) => res.data.data);
      data && store.dispatch(setErrorMovieLoading(false));
      store.dispatch(loadMovie(data as Movie));
    } catch (error) {
      store.dispatch(setErrorMovieLoading(true));
      errorHandle(error);
    }
  }
);

export const fetchCommentsAction = createAsyncThunk(
  'data/fetchComments',
  async () => {
    try {
      const data = await api
        .get<Comment[]>(process.env.REACT_APP_API_URL + APIRoute.Comments)
        .then((res: AxiosResponse) => res.data.data);
      store.dispatch(loadComments(data as Comment[]));
    } catch (error) {
      errorHandle(error);
    }
  }
);

export const leaveCommentAction = createAsyncThunk(
  'comment/leaveComment',
  async ({
    movie,
    comment,
    rating,
    date,
    users_permissions_user,
  }: AddComment) => {
    try {
      const { data } = await api.post(
        process.env.REACT_APP_API_URL + APIRoute.CommentUpload,
        {
          data: {
            movie,
            comment,
            rating,
            date,
            users_permissions_user,
          },
        },
        {
          headers: {
            Authorization: `Bearer + ${getToken()}`,
          },
        }
      );
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
