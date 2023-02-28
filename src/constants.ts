export const TITLE = 'The Grand Budapest Hotel';
export const GENRE = 'Drama';
export const DATE = '2014';

export const TIMEOUT_SHOW_ERROR = 2000;

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum APIRoute {
  Movies = '/movies?populate=*',
  Login = '/login',
  Logout = '/logout',
}

export enum AppRoute {
  Any = '*',
  Main = '/',
  Login = '/login',
  Logout = '/logout',
  List = '/mylist',
  Film = '/films/:id',
  Review = '/films/:id/review',
  Player = '/player/:id',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_Auth',
  Unknown = 'UNKNOWN',
}

export enum Genres {
  All = 'All genres',
}
