import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentPage, setGenre } from '../../store/action';
import { Genres } from '../../constants';

function GenresList() {
  const { movies, genre } = useAppSelector((state) => state);

  const allGenres = Object.values(
    movies!.map((movie: any) => movie.attributes.genre)
  );
  const genres = [Genres.All, ...new Set(allGenres)];
  const [activeGenre, setActiveGenre] = useState<string>(genres[0]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    genre !== Genres.All && activeGenre === Genres.All
      ? dispatch(setGenre(''))
      : dispatch(setGenre(activeGenre));
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
              onClick={() => {
                setActiveGenre(genre);
                activeGenre !== genre && dispatch(setCurrentPage(1));
              }}
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
