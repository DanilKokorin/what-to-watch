import { ReactNode, useEffect } from 'react';
import { generatePath, Link, useParams } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../constants';
import withMovieCard from '../../hocs/with-movie-card/with-movie-card';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchMovieAction } from '../../store/api-action';
import ErrorPage from '../error-page/error-page';
import Header from '../header/header';
import MoviePageDetails from '../movie-page-details/movie-page-details';
import MoviePageReviews from '../movie-page-reviews/movie-page-reviews';
import MoviePage from '../movie-page/movie-page';
import MoviesList from '../movies-list/movies-list';
import Tab from '../tabs/tab';
import Tabs from '../tabs/tabs';

type TabsConfigItem = {
  id: number;
  label: string;
  component: ReactNode;
};

const MoviesListHOC = withMovieCard(MoviesList);

function toHoursAndMinutes(totalMinutes: number) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${hours}h ${minutes}m`;
}

function Movie(): JSX.Element {
  const params = useParams();
  const pathId = Number(params.id);

  useEffect(() => {
    store.dispatch(fetchMovieAction(pathId));
  }, []);

  const { movie, authStatus, errorMovieLoading } = useAppSelector(
    (state) => state
  );

  if (errorMovieLoading) {
    return <ErrorPage />;
  }

  const runTime = toHoursAndMinutes(movie?.attributes.runTime);

  const tabs: TabsConfigItem[] = [
    {
      id: 1,
      label: 'Overview',
      component: movie && (
        <MoviePage
          rating={movie.attributes?.rating}
          description={movie.attributes?.description}
          scoresCount={movie.attributes?.scoresCount}
          director={movie.attributes?.director}
          starring={movie.attributes?.starrings.data}
        />
      ),
    },
    {
      id: 2,
      label: 'Details',
      component: movie && (
        <MoviePageDetails
          director={movie.attributes.director}
          starring={movie.attributes.starrings.data.map(
            (item: any) => item.attributes.name
          )}
          runTime={runTime}
          genre={movie.attributes.genre}
          released={movie.attributes.released}
        />
      ),
    },
    {
      id: 3,
      label: 'Reviews',
      component: movie && <MoviePageReviews filmId={movie.id} />,
    },
  ];

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img
              src={`http://localhost:1337${movie?.attributes.backgroundImage.data.attributes.url}`}
              alt={movie?.attributes.name}
            />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{movie?.attributes.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">
                  {movie?.attributes.genre}
                </span>
                <span className="film-card__year">
                  {movie?.attributes.released}
                </span>
              </p>

              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                </button>
                {authStatus === AuthStatus.Auth && (
                  <Link
                    to={generatePath(AppRoute.Review, { id: `${pathId}` })}
                    className="btn film-card__button"
                  >
                    Add review
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={`http://localhost:1337${movie?.attributes.posterImage.data.attributes.url}`}
                alt={movie?.attributes.name}
                width="218"
                height="327"
              />
            </div>

            <Tabs>
              {tabs.map((tab) => (
                <Tab key={tab.label} title={tab.label}>
                  {tab.component}
                </Tab>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            <MoviesListHOC
              selectedMovieId={movie?.id}
              selectedMovieCard={movie?.attributes.genre}
            />
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
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

export default Movie;
