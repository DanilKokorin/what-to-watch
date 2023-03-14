import { movieRating } from '../../constants';

type MoviePageProps = {
  rating: number | undefined;
  description: string;
  scoresCount: number | undefined;
  director: string;
  starring: string[];
};

function MoviePage({
  rating,
  description,
  scoresCount,
  director,
  starring,
}: MoviePageProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{movieRating(rating)}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description} </p>

        <p className="film-card__director">
          <strong>Director: {`${director}`}</strong>
        </p>

        <p className="film-card__starring">
          <strong>
            Starring: {`${starring?.map((item: any) => item.attributes?.name)}`}
          </strong>
        </p>
      </div>
    </>
  );
}

export default MoviePage;
