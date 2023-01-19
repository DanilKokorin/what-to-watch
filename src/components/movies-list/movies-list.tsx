import { Fragment, useState } from 'react';
import { Movies } from '../../mocks/movieType';

type MoviesListProps = {
  movies: Movies;
  renderCard: (
    id: number,
    src: string,
    title: string,
    poster: string,
    previewImage: string,
    onHoverCardCallback: () => void,
    onLeaveCardCallback: () => void,
    isPlaying: boolean
  ) => JSX.Element;
  selectedMovieId?: number;
  selectedGenre?: string;
};

function MoviesList({
  movies,
  renderCard,
  selectedMovieId,
  selectedGenre,
}: MoviesListProps) {
  const [activeMovieId, setActiveMovieId] = useState<number>(-1);

  const moviesList = !selectedGenre
    ? movies
    : movies
        .filter(
          (item) => item.id !== selectedMovieId && item.genre === selectedGenre
        )
        .slice(0, 4);

  return (
    <>
      {movies &&
        moviesList.map((movie) => {
          return (
            <Fragment key={movie.id}>
              {renderCard(
                movie.id,
                movie.previewVideoLink,
                movie.name,
                movie.posterImage,
                movie.previewImage,
                () => setActiveMovieId(movie.id),
                () => setActiveMovieId(-1),
                !selectedGenre && movie.id === activeMovieId
              )}
            </Fragment>
          );
        })}
    </>
  );
}

export default MoviesList;
