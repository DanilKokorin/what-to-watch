import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import withMovieCard from '../../hocs/with-movie-card/with-movie-card';
import { Comments } from '../../mocks/commentType';
import { Movies } from '../../mocks/movieType';
import Logo from '../logo/logo';
import MoviePageDetails from '../movie-page-details/movie-page-details';
import MoviePageReviews from '../movie-page-reviews/movie-page-reviews';
import MoviePage from '../movie-page/movie-page';
import MoviesList from '../movies-list/movies-list';
import Tab from '../tabs/tab';
import Tabs from '../tabs/tabs';

type MovieProps = {
  movies: Movies;
  reviews: Comments;
};

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

function Movie({ movies, reviews }: MovieProps): JSX.Element {
  const params = useParams();
  const pathId = Number(params.id);

  const movie = movies.find((movie) => movie.id === pathId);

  const runTime = toHoursAndMinutes(movie!.runTime);

  const tabs: TabsConfigItem[] = [
    {
      id: 1,
      label: 'Overview',
      component: movie && (
        <MoviePage
          rating={movie.rating}
          description={movie.description}
          scoresCount={movie.scoresCount}
          director={movie.director}
          starring={movie.starring}
        />
      ),
    },
    {
      id: 2,
      label: 'Details',
      component: movie && (
        <MoviePageDetails
          director={movie.director}
          starring={movie.starring.map((item) => item)}
          runTime={runTime}
          genre={movie.genre}
          released={movie.released}
        />
      ),
    },
    {
      id: 3,
      label: 'Reviews',
      component: movie && (
        <MoviePageReviews reviews={reviews} filmId={movie.id} />
      ),
    },
  ];

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={movie?.backgroundImage} alt={movie?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img
                    src="img/avatar.jpg"
                    alt="User avatar"
                    width="63"
                    height="63"
                  />
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{movie?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{movie?.genre}</span>
                <span className="film-card__year">{movie?.released}</span>
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
                <a href="add-review.html" className="btn film-card__button">
                  Add review
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={movie?.posterImage}
                alt={movie?.name}
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
              movies={movies}
              selectedMovieId={movie?.id}
              selectedGenre={movie?.genre}
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
