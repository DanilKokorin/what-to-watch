export const TITLE = 'The Grand Budapest Hotel';
export const GENRE = 'Drama';
export const DATE = '2014';

export enum HTTP_CODE {
  OK = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

export enum APIRoute {
  Movies = '/movies?populate=*',
  LoginCheker = '/auth-check-temps',
  Login = '/auth/local',
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
