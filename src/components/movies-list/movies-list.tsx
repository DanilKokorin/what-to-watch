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
};

function MoviesList({ movies, renderCard }: MoviesListProps) {
  const [activeMovieId, setActiveMovieId] = useState<number>(-1);
  return (
    <>
      {movies.map((movie) => {
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
              movie.id === activeMovieId
            )}
          </Fragment>
        );
      })}
    </>
  );
}

export default MoviesList;
