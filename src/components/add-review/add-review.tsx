import { useParams } from 'react-router-dom';
import Logo from '../logo/logo';
import AddReviewForm from '../add-review-form/add-review-form';
import { useAppSelector } from '../../hooks';

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
            src={`http://localhost:1337${movie.attributes?.backgroundImage.data.attributes?.url}`}
            alt={movie?.attributes.name}
          />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">
                  {movie.attributes.name}
                </a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img
                  src="img/avatar.jpg"
                  alt="User avatar"
                  width="63"
                  height="63"
                />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img
            src={`http://localhost:1337${movie.attributes?.posterImage.data.attributes?.url}`}
            alt={movie.attributes.name}
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
