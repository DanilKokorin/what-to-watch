import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import useVideoPlayer from './useVideoPlayer';
import './styles.css';

interface Props {
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
}

function Player(props: Props): JSX.Element {
  const { autoPlay, muted, loop } = props;

  const params = useParams();
  const selectedId = Number(params.id);

  const { movies } = useAppSelector(({ movies }) => movies);
  const movie: any = movies.find((movie: any) => movie.id === selectedId);

  const videoElement = useRef<HTMLVideoElement | null>(null);

  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    goBackOnExitPlayer,
    handleForward,
    handleRewind,
    getElapsedRuntime,
    toggleFullScreen,
    getFullRuntime,
    toggleElapsedRuntimeMode,
  } = useVideoPlayer(videoElement);

  return (
    <div className="container">
      <div className="video-wrapper">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoElement}
          src={movie?.attributes.videoLink}
          className="player__video"
          poster={`http://localhost:1337/uploads/player_poster_b115a03ca8.jpg`}
          onTimeUpdate={handleOnTimeUpdate}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
        />
        <button
          type="button"
          className="player__exit"
          onClick={goBackOnExitPlayer}
        >
          Exit
        </button>
        <div className="controls">
          <div className="actions">
            <button onClick={togglePlay}>
              {!playerState.isPlaying ? (
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#play-s" />
                </svg>
              ) : (
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#pause" />
                </svg>
              )}
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={(e) => handleVideoProgress(e)}
          />
          <div
            className="player__time-value"
            onClick={toggleElapsedRuntimeMode}
          >
            {!playerState.isElapsedRuntimeMode
              ? getElapsedRuntime()
              : getFullRuntime()}
          </div>
          <select
            className="velocity"
            value={playerState.speed}
            onChange={(e) => handleVideoSpeed(e)}
          >
            <option value="0.50">0.50x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="2">2x</option>
          </select>
          <button className="mute-btn" onClick={toggleMute}>
            {!playerState.isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M4 17h2.697l5.748 3.832a1.004 1.004 0 0 0 1.027.05A1 1 0 0 0 14 20V4a1 1 0 0 0-1.554-.832L6.697 7H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zm0-8h3c.033 0 .061-.016.093-.019a1.027 1.027 0 0 0 .379-.116c.026-.014.057-.017.082-.033L12 5.868v12.264l-4.445-2.964c-.025-.018-.056-.02-.082-.033a.977.977 0 0 0-.382-.116C7.059 15.016 7.032 15 7 15H4V9z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="m21.707 20.293-2.023-2.023A9.566 9.566 0 0 0 21.999 12c0-4.091-2.472-7.453-5.999-9v2c2.387 1.386 3.999 4.047 3.999 7a8.113 8.113 0 0 1-1.672 4.913l-1.285-1.285C17.644 14.536 18 13.19 18 12c0-1.771-.775-3.9-2-5v7.586l-2-2V4a1 1 0 0 0-1.554-.832L7.727 6.313l-4.02-4.02-1.414 1.414 18 18 1.414-1.414zM12 5.868v4.718L9.169 7.755 12 5.868zM4 17h2.697l5.748 3.832a1.004 1.004 0 0 0 1.027.05A1 1 0 0 0 14 20v-1.879l-2-2v2.011l-4.445-2.964c-.025-.017-.056-.02-.082-.033a.986.986 0 0 0-.382-.116C7.059 15.016 7.032 15 7 15H4V9h.879L3.102 7.223A1.995 1.995 0 0 0 2 9v6c0 1.103.897 2 2 2z" />
              </svg>
            )}
          </button>

          <div className="player__name">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              onClick={handleRewind}
            >
              <path d="M12 2C6.486 2 2 6.485 2 12s4.486 10 10 10c5.515 0 10-4.485 10-10S17.515 2 12 2zm5 14-6-4v4l-6-4 6-4v4l6-4v8z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              onClick={handleForward}
            >
              <path d="M12 2C6.485 2 2 6.485 2 12s4.485 10 10 10c5.514 0 10-4.485 10-10S17.514 2 12 2zm1 14v-4l-6 4V8l6 4V8l6 4-6 4z" />
            </svg>
          </div>

          <button
            type="button"
            className="player__full-screen"
            onClick={toggleFullScreen}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Player;
