import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { setGenre } from '../../store/action';
import { Movies } from '../../mocks/movieType';
import { Link } from 'react-router-dom';

type GenresListProps = {
  movies: Movies;
};

function GenresList({ movies }: GenresListProps) {
  const allGenres = Object.values(movies!.map((movie) => movie.genre));
  const genres = ['All genres', ...new Set(allGenres)];

  const [activeGenre, setActiveGenre] = useState<string>(genres[0]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setGenre(activeGenre));
  }, [activeGenre]);

  return (
    <>
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <ul className="catalog__genres-list">
        {genres.map((genre) => (
          <li
            key={genre}
            className={`catalog__genres-item ${
              activeGenre === genre && 'catalog__genres-item--active'
            }`}
          >
            <Link
              to="#"
              className="catalog__genres-link"
              onClick={() => setActiveGenre(genre)}
            >
              {genre}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default GenresList;
