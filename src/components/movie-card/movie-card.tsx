import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../constants';
import VideoPlayer from '../video-player/video-player';

type MovieCardProps = {
  id: number;
  movie: string;
  title: string;
  poster: string;
  previewImage: string;
  onHoverCardCallback?: () => void;
  onLeaveCardCallback?: () => void;
  isPlaying?: boolean;
};

function MovieCard(props: MovieCardProps) {
  const {
    id,
    movie,
    title,
    poster,
    previewImage,
    isPlaying,
    onHoverCardCallback,
    onLeaveCardCallback,
  } = props;

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onHoverCardHandle = async () => {
    await delay(1000);
    onHoverCardCallback && onHoverCardCallback();
  };

  return (
    <>
      <article
        className="small-film-card catalog__films-card"
        onMouseEnter={onHoverCardHandle}
        onMouseLeave={onLeaveCardCallback}
      >
        <Link
          to={generatePath(AppRoute.Film, { id: `${id}` })}
          className="small-film-card__link"
        >
          <div className="small-film-card__image">
            {isPlaying ? (
              <VideoPlayer src={movie} poster={poster} isPlaying={isPlaying} />
            ) : (
              <>
                <img src={previewImage} alt={title} width="280" height="175" />
                <h3 className="small-film-card__title">{title}</h3>
              </>
            )}
          </div>
        </Link>
      </article>
    </>
  );
}

export default MovieCard;
