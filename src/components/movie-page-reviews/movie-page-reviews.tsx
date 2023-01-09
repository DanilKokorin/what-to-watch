import { Comments } from '../../mocks/commentType';

type MoviePageReviewsProps = {
  filmId: number;
  reviews: Comments;
};

function MoviePageReviews({
  reviews,
  filmId,
}: MoviePageReviewsProps): JSX.Element {
  return (
    <>
      {reviews.map(
        (review, index) =>
          review.id === filmId && (
            <div
              key={`${index.toString()} - ${review.id.toString()}`}
              className="film-card__reviews-col"
            >
              <div className="review">
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
            </div>
          )
      )}
    </>
  );
}

export default MoviePageReviews;
