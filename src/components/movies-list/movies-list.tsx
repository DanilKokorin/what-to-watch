import { Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Movies } from '../../mocks/movieType';
import { getMoviesByGenre } from '../../store/action';
import Spinner from '../spinner/spinner';

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
  const { genre, moviesByGenre, moviesPerPage, currentPage, isDataLoaded } =
    useAppSelector((state) => state);

  const [activeMovieId, setActiveMovieId] = useState<number>(-1);
  const [currentMovies, setCurrentMovies] = useState<Movies>([]);
  const [cache, setCache] = useState<any>([]);

  const dispatch = useAppDispatch();

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

  const sliceMoviesList = (start: number, end: number) => {
    return moviesByGenre.slice(start, end);
  };

  useEffect(() => {
    dispatch(getMoviesByGenre());
  }, [currentPage, genre, isDataLoaded]);

  useEffect(() => {
    setCurrentMovies([]);
  }, [genre, selectedMovieId]);

  useEffect(() => {
    if (selectedMovieCard) {
      const moreLikeThis = moviesByGenre
        .filter((item) => item.id !== selectedMovieId)
        .slice(0, 4);

      setCache(moreLikeThis);
    } else {
      if (moviesByGenre.length + 1 > moviesPerPage) {
        const slicedMovies = sliceMoviesList(
          indexOfFirstMovie,
          indexOfLastMovie
        );

        setCache(slicedMovies);
      } else {
        setCurrentMovies([]);
        setCache(moviesByGenre);
      }
    }
  }, [moviesByGenre, currentPage, genre, selectedMovieId]);

  useEffect(() => {
    setCurrentMovies([...currentMovies, ...cache]);
  }, [cache]);

  return (
    <>
      {isDataLoaded ? (
        currentMovies.map((movie: any) => {
          return (
            <Fragment key={movie.id}>
              {renderCard(
                movie.id,
                movie.attributes.previewVideoLink,
                movie.attributes.name,
                `http://localhost:1337${movie.attributes.posterImage.data.attributes.url}`,
                `http://localhost:1337${movie.attributes.previewImage.data.attributes.url}`,
                () => setActiveMovieId(movie.id),
                () => setActiveMovieId(-1),
                !selectedMovieCard && movie.id === activeMovieId
              )}
            </Fragment>
          );
        })
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default MoviesList;
