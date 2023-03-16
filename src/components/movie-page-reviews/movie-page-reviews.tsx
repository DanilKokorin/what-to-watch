import { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchCommentsAction } from '../../store/api-action';

type MoviePageReviewsProps = {
  filmId: number;
};

function MoviePageReviews({ filmId }: MoviePageReviewsProps): JSX.Element {
  const gridCols: JSX.Element[][] = [[], []];

  useEffect(() => {
    store.dispatch(fetchCommentsAction());
  }, []);

  const { comments } = useAppSelector(({ reviews }) => reviews);

  const movieReviews = comments.filter(
    (comment: any) => comment.attributes.movie.data?.id === filmId
  );

  movieReviews.forEach((review: any, index: number) => {
    const reviews = (
      <div
        className="review"
        key={`${index.toString()} - ${review.id.toString()}`}
      >
        <blockquote className="review__quote">
          <p className="review__text">{review?.attributes.comment}</p>
          <footer className="review__details">
            <cite className="review__author">
              {review.attributes.reviewer.data?.attributes.name ||
                review.attributes.users_permissions_user.data?.attributes
                  .username}
            </cite>
            <time
              className="review__date"
              dateTime={new Date(
                new Date(review?.attributes.date).toISOString()
              ).toDateString()}
            >
              {review?.attributes.date}
            </time>
          </footer>
        </blockquote>

        <div className="review__rating">{review?.attributes.rating}</div>
      </div>
    );

    const colNumber = index % 2;
    gridCols[colNumber].push(reviews);
  });

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">{gridCols[0]}</div>
      <div className="film-card__reviews-col">{gridCols[1]}</div>
    </div>
  );
}

export default MoviePageReviews;
