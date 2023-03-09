import { useAppSelector } from '../../hooks';
import Header from '../header/header';
import MovieCard from '../movie-card/movie-card';

function MyList(): JSX.Element {
  const { movies } = useAppSelector((state) => state);

  return (
    <>
      <div className="user-page">
        <Header />

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <p>My list</p>
          <div className="catalog__films-list">
            {movies.map(
              (movie: any) =>
                movie.isFavorite && (
                  <MovieCard
                    key={movie.id + movie.attributes.name}
                    id={movie.id}
                    previewImage={`http://localhost:1337${movie.attributes.previewImage.data.attributes.url}`}
                    title={movie.attributes.name}
                    movie={movie.attributes.previewVideoLink}
                    poster={`http://localhost:1337${movie.attributes.posterImage.data.attributes.url}`}
                    isPlaying={false}
                  />
                )
            )}
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

export default MyList;
