import { Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getMoviesByGenre } from '../../store/action';

type MoviesListProps = {
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
  selectedMovieCard?: string;
};

function MoviesList({
  renderCard,
  selectedMovieId,
  selectedMovieCard,
}: MoviesListProps) {
  const [activeMovieId, setActiveMovieId] = useState<number>(-1);

  const { genre, moviesByGenre } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMoviesByGenre());
  }, [genre]);

  const moviesList = !selectedMovieCard
    ? moviesByGenre
    : moviesByGenre
        .filter(
          (item) =>
            item.id !== selectedMovieId && item.genre === selectedMovieCard
        )
        .slice(0, 4);

  return (
    <>
      {moviesList.map((movie) => {
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
              !selectedMovieCard && movie.id === activeMovieId
            )}
          </Fragment>
        );
      })}
    </>
  );
}

export default MoviesList;
