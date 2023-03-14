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
  Movie = '/movies',
  Comments = '/comments?populate=*',
  CommentUpload = '/comments',
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

export const RatingValues = {
  MIN: 1,
  MAX: 10,
};

export const ReviewLength = {
  MIN: 50,
  MAX: 400,
};

export const movieRating = (rating: number | undefined): string | undefined => {
  if (rating) {
    if (rating >= 0 && rating < 3) {
      return 'Bad';
    } else if (rating >= 3 && rating < 5) {
      return 'Normal';
    } else if (rating >= 5 && rating < 8) {
      return 'Good';
    } else if (rating >= 8 && rating < 10) {
      return 'Very good';
    } else if (rating === 10) {
      return 'Awesome';
    }
  }
};
