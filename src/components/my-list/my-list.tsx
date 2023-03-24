import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoritesAction } from '../../store/api-action';
import Header from '../header/header';
import MovieCard from '../movie-card/movie-card';

function MyList(): JSX.Element {
  const dispatch = useAppDispatch();

  const { favorites, emptyFavorites } = useAppSelector(
    ({ favorites }) => favorites
  );

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  return (
    <>
      <div className="user-page">
        <Header />

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          {emptyFavorites ? (
            <div className="sign-in user-page__content">
              <Link to="/" className="page-title user-page__title">
                <h1 className="page-title sign-in__label">Добавить фильмы.</h1>
              </Link>
            </div>
          ) : (
            <div className="catalog__films-list">
              {favorites.map((favorite: any) =>
                favorite?.attributes?.movies?.data?.map((movie: any) => (
                  <MovieCard
                    key={movie.id + movie?.attributes?.name}
                    id={movie.id}
                    previewImage={`http://localhost:1337${movie?.attributes?.previewImage?.data?.attributes?.url}`}
                    title={movie?.attributes?.name}
                    movie={movie?.attributes?.previewVideoLink}
                    poster={`http://localhost:1337${movie?.attributes?.posterImage?.data?.attributes?.url}`}
                    isPlaying={false}
                  />
                ))
              )}
            </div>
          )}
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

export default MyList;
