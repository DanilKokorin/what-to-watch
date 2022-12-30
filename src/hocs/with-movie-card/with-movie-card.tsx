import { ComponentType } from 'react';
import MovieCard from '../../components/movie-card/movie-card';

type HOCProps = {
  renderCard: (
    id: number,
    src: string,
    poster: string,
    previewImage: string,
    onHoverCardCallback: () => void,
    onLeaveCardCallback: () => void,
    isPlaying: boolean
  ) => void;
};

function withMovieCard<T>(
  Component: ComponentType<T>
): ComponentType<Omit<T, keyof HOCProps>> {
  type ComponentProps = Omit<T, keyof HOCProps>;

  function WithMovieCard(props: ComponentProps): JSX.Element {
    return (
      <Component
        {...(props as T)}
        renderCard={(
          id: number,
          src: string,
          title: string,
          poster: string,
          previewImage: string,
          onHoverCardCallback: () => void,
          onLeaveCardCallback: () => void,
          isPlaying: boolean
        ) => {
          return (
            <MovieCard
              id={id}
              movie={src}
              title={title}
              poster={poster}
              previewImage={previewImage}
              isPlaying={isPlaying}
              onHoverCardCallback={onHoverCardCallback}
              onLeaveCardCallback={onLeaveCardCallback}
            />
          );
        }}
      />
    );
  }
  return WithMovieCard;
}

export default withMovieCard;
