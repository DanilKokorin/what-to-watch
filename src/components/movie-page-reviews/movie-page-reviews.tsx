import { Comments } from '../../mocks/commentType';

type MoviePageReviewsProps = {
  filmId: number;
  reviews: Comments;
};

function MoviePageReviews({
  reviews,
  filmId,
}: MoviePageReviewsProps): JSX.Element {
  const gridCols: JSX.Element[][] = [[], []];

  const movieReviews = reviews.filter((review) => review.id === filmId);

  movieReviews.forEach((review, index) => {
    const reviews = (
      <div
        className="review"
        key={`${index.toString()} - ${review.id.toString()}`}
      >
        <blockquote className="review__quote">
          <p className="review__text">{review.comment}</p>
          <footer className="review__details">
            <cite className="review__author">{review.user.name}</cite>
            <time
              className="review__date"
              dateTime={new Date(
                new Date(review.date).toISOString()
              ).toDateString()}
            >
              {review.date}
            </time>
          </footer>
        </blockquote>

        <div className="review__rating">{review.rating}</div>
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
