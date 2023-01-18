import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentPage } from '../../store/action';

function ShowMore() {
  const {
    currentPage,
    totalCountMovies,
    moviesPerPage,
    isLoading,
    moviesByGenre,
  } = useAppSelector((state) => state);
  const [showMoreButton, setShowMoreButton] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const totalPages = Math.ceil(totalCountMovies / moviesPerPage);

  useEffect(() => {
    setShowMoreButton(true);

    if (currentPage === totalPages) {
      setShowMoreButton(false);
    }
  }, [currentPage, moviesByGenre]);

  const loadMoreHandle = () => {
    currentPage !== totalPages && dispatch(setCurrentPage(currentPage + 1));
  };

  return (
    <div className="catalog__more">
      {showMoreButton && (
        <button
          className="catalog__button"
          type="button"
          onClick={loadMoreHandle}
          disabled={isLoading}
        >
          Show more
        </button>
      )}
    </div>
  );
}

export default ShowMore;
