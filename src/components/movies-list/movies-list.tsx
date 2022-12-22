import { useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import MovieCard from '../movie-card/movie-card';
import { Movies } from '../../mocks/movieType';
import { AppRoute } from '../../constants';

type MoviesListProps = {
  movies: Movies;
};

function MoviesList({ movies }: MoviesListProps) {
  const [activeMovie, setActiveMovie] = useState<string | null>(null);

  const onCardHandle = (movieId: string): void => {
    setActiveMovie(movieId);
  };

  return (
    <>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          previewImage={movie.previewImage}
          title={movie.name}
          onMouseEnter={() => onCardHandle(movie.id + movie.name)}
        />
      ))}
    </>
  );
}

export default MoviesList;
