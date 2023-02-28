import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

function Player(): JSX.Element {
  const params = useParams();
  const selectedId = Number(params.id);

  const { movies } = useAppSelector((state) => state);

  const movie: any = movies.find((movie: any) => movie.id === selectedId);

  return (
    <>
      <div className="player">
        <video
          src={movie?.attributes.videoLink}
          className="player__video"
          poster={`http://localhost:1337/uploads/player_poster_b115a03ca8.jpg`}
          // poster="img/player-poster.jpg"
          muted
          autoPlay
        />
        <button type="button" className="player__exit">
          Exit
        </button>
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100" />
              <div className="player__toggler" style={{ left: '30%' }}>
                Toggler
              </div>
            </div>
            <div className="player__time-value">
              {movie?.attributes.runTime}
            </div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s" />
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">Transpotting</div>

            <button type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen" />
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Player;
