import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../constants';

type MovieCardProps = {
  id: number;
  previewImage: string;
  title: string;
  onMouseEnter?: (event: any) => void;
};

function MovieCard({ id, previewImage, title, onMouseEnter }: MovieCardProps) {
  return (
    <>
      <article
        className="small-film-card catalog__films-card"
        onMouseEnter={onMouseEnter}
      >
        <Link
          to={generatePath(AppRoute.Film, { id: `${id}` })}
          className="small-film-card__link"
        >
          <div className="small-film-card__image">
            <img src={previewImage} alt={title} width="280" height="175" />
          </div>
          <h3 className="small-film-card__title">{title}</h3>
        </Link>
      </article>
    </>
  );
}

export default MovieCard;
