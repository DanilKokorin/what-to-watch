import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { api, store } from '.';
import { errorHandle } from '../api/error-handle';
import { dropToken, getToken, saveToken } from '../api/token';
import { AppRoute, APIRoute, AuthStatus } from '../constants';
import { Movie } from '../mocks/movieType';
import { AuthData, FavoriteMovie, UserData } from '../types/data';
import { AddComment } from '../types/AddComment';
import { Comment } from '../mocks/commentType';
import { redirectToRoute } from './action';
import { requireAuthorization } from './user-process/user-process';
import { loadMovie, loadMovies, loadPromos } from './movie-data/movie-data';
import { setErrorMovieLoading } from './error-process/error-process';
import { loadComments } from './review-data/review-data';
import { setEmpty, setFavorites } from './favorites-data/favorites-data';

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

export const fetchPromoAction = createAsyncThunk(
  'data/fetchMovie',
  async () => {
    try {
      const data = await api
        .get<Movie>(process.env.REACT_APP_API_URL + APIRoute.Promo)
        .then((res: AxiosResponse) => res.data.data);
      data && store.dispatch(setErrorMovieLoading(false));
      store.dispatch(loadPromos(data as Movie));
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

export const leaveReviewAction = createAsyncThunk(
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
            // apiClient -> Interceptors
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
    } catch (error) {
      errorHandle(error);
    }
  }
);

export const fetchFavoritesAction = createAsyncThunk(
  'data/fetchFavorites',
  async () => {
    try {
      const data = await api
        .get<Movie[]>(process.env.REACT_APP_API_URL + APIRoute.Favorites, {
          headers: {
            // apiClient -> Interceptors
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then((res: AxiosResponse) => res.data.data);

      data && data[0].attributes.movies.data.length
        ? store.dispatch(setEmpty(false))
        : store.dispatch(setEmpty(true));
      store.dispatch(setFavorites(data));
      data && store.dispatch(setErrorMovieLoading(false));
    } catch (error) {
      store.dispatch(setErrorMovieLoading(true));
      errorHandle(error);
    }
  }
);

export const addFavoriteAction = createAsyncThunk(
  'favorites/setFavorites',
  async ({ movies, users_permissions_user }: FavoriteMovie) => {
    try {
      // запрос user-id из Strapi favorite table
      const id = await api
        .get('http://localhost:1337/api/favorites/', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then((id) => id.data.data[0].id);

      const { data } = await api.put(
        process.env.REACT_APP_API_URL + `${APIRoute.FavoritesUpload}/${id}`,
        {
          data: {
            movies,
            users_permissions_user,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      store.dispatch(fetchFavoritesAction());
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
    store.dispatch(setFavorites([]));
    store.dispatch(requireAuthorization(AuthStatus.NoAuth));
    store.dispatch(redirectToRoute(AppRoute.Main));
  } catch (error) {
    errorHandle(error);
    store.dispatch(requireAuthorization(AuthStatus.NoAuth));
  }
});
