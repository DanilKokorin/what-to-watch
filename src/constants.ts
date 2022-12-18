export const TITLE = 'The Grand Budapest Hotel';
export const GENRE = 'Drama';
export const DATE = '2014';

export enum AppRoute {
  Any = '*',
  Main = '/',
  Login = '/login',
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
