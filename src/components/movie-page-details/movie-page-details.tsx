type MoviePageDetailsProps = {
  director: string;
  starring: string[];
  runTime: string;
  genre: string;
  released: number;
};

function MoviePageDetails({
  director,
  starring,
  runTime,
  genre,
  released,
}: MoviePageDetailsProps): JSX.Element {
  return (
    <>
      <div className="film-card__text film-card__row">
        <div className="film-card__text-col">
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Director</strong>
            <span className="film-card__details-value">{director}</span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Starring</strong>
            <span className="film-card__details-value">
              {starring.map((item, i) => (
                <span key={item}>
                  {`${item}${i !== starring.length - 1 ? ',' : ''}`}
                  <br />
                </span>
              ))}
            </span>
          </p>
        </div>

        <div className="film-card__text-col">
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Run Time</strong>
            <span className="film-card__details-value">{runTime}</span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Genre</strong>
            <span className="film-card__details-value">{genre}</span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Released</strong>
            <span className="film-card__details-value">{released}</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default MoviePageDetails;
