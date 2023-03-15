import { useParams } from 'react-router-dom';
import AddReviewForm from '../add-review-form/add-review-form';
import { useAppSelector } from '../../hooks';
import Header from '../header/header';

function AddReview(): JSX.Element {
  const params = useParams();
  const pathId = Number(params.id);

  const { movies } = useAppSelector((state) => state);

  const movie: any = movies.find((movie) => movie.id === pathId);

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img
            src={`http://localhost:1337${movie?.attributes.backgroundImage.data.attributes.url}`}
            alt={movie?.attributes.name}
          />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__poster film-card__poster--small">
          <img
            src={`http://localhost:1337${movie?.attributes.posterImage.data.attributes.url}`}
            alt={movie?.attributes.name}
            width="218"
            height="327"
          />
        </div>
      </div>

      <AddReviewForm />
    </section>
  );
}

export default AddReview;
