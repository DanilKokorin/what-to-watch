import MoviesList from '../movies-list/movies-list';
import withMovieCard from '../../hocs/with-movie-card/with-movie-card';
import GenresList from '../genres-list/genres-list';
import ShowMore from '../show-more/show-more';
import Header from '../header/header';
import { generatePath, Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthStatus, user_id } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ErrorPage from '../error-page/error-page';
import { useEffect, useState } from 'react';
import {
  addFavoriteAction,
  fetchFavoritesAction,
  fetchPromoAction,
} from '../../store/api-action';

const MoviesListHOC = withMovieCard(MoviesList);

function MainScreen(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { authStatus } = useAppSelector(({ user }) => user);
  const isAuthorized = authStatus === AuthStatus.Auth;

  const { promos } = useAppSelector(({ movies }) => movies);
  const { errorMovieLoading } = useAppSelector(({ errors }) => errors);

  const { favorites } = useAppSelector(({ favorites }) => favorites);
  const [favoritesIDs, setFavoritesIDs] = useState<number[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [promoId, setPromoId] = useState<number>(-1);
  const [promoMovie, setPromoMovie] = useState<any>();

  const { movies } = useAppSelector(({ movies }) => movies);

  const movie: any = movies.find((movie: any) => movie.id === promoId);

  useEffect(() => {
    dispatch(fetchPromoAction());
  }, [dispatch]);

  useEffect(() => {
    isAuthorized && dispatch(fetchFavoritesAction());
  }, [authStatus]);

  useEffect(() => {
    const promoId = promos.map(
      (promo: any) => promo.attributes.movies.data[0].id
    )[0];

    const promoMovie = promos.map(
      (promo: any) => promo.attributes?.movies.data[0].attributes
    )[0];

    setPromoId(promoId);
    setPromoMovie(promoMovie);
  }, [promos]);

  useEffect(() => {
    const ids = favorites.map((favorite: any) =>
      favorite?.attributes?.movies?.data?.map((movie: any) => movie.id)
    )[0];
    setFavoritesIDs(ids);
  }, [favorites]);

  useEffect(() => {
    setIsFavorite(favoritesIDs && favoritesIDs.includes(promoId));
  }, [favoritesIDs]);

  if (errorMovieLoading) {
    return <ErrorPage />;
  }

  const addToFavorite = (event?: any) => {
    event.preventDefault();

    if (!isAuthorized) {
      return navigate(AppRoute.Login);
    }

    if (!isFavorite) {
      dispatch(
        addFavoriteAction({
          movies: [...favoritesIDs, promoId],
          users_permissions_user: user_id.id,
        })
      );
      setIsFavorite(true);
      setFavoritesIDs([...favoritesIDs, promoId]);
    } else {
      const originIDs = favoritesIDs.filter((item) => item !== promoId);
      dispatch(
        addFavoriteAction({
          movies: originIDs,
          users_permissions_user: user_id.id,
        })
      );
      setIsFavorite(false);
      setFavoritesIDs([...originIDs]);
    }
  };

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src="img/the-grand-budapest-hotel-bg.jpg"
            alt="The Grand Budapest Hotel"
          />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                // src="img/the-grand-budapest-hotel-poster.jpg"
                src={`http://localhost:1337${movie?.attributes.posterImage.data?.attributes.url}`}
                alt={promoMovie?.name}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoMovie?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoMovie?.genre}</span>
                <span className="film-card__year">{promoMovie?.released}</span>
              </p>

              <div className="film-card__buttons">
                <Link
                  className="film-card__button"
                  to={generatePath(AppRoute.Player, { id: `${promoId}` })}
                >
                  <button
                    className="btn btn--play film-card__button"
                    type="button"
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s" />
                    </svg>
                    <span>Play</span>
                  </button>
                </Link>
                {isAuthorized && (
                  <button
                    className="btn btn--list film-card__button"
                    type="button"
                    onClick={addToFavorite}
                  >
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      {isFavorite ? (
                        <use xlinkHref="#in-list" />
                      ) : (
                        <use xlinkHref="#add" />
                      )}
                    </svg>
                    <span>My list</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <GenresList />

          <div className="catalog__films-list">
            <MoviesListHOC />
          </div>

          <ShowMore />
        </section>
        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainScreen;
