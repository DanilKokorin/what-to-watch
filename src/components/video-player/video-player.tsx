import { useEffect, useRef, useState } from 'react';

type VideoPlayerProps = {
  src: string;
  poster: string;
  isPlaying: boolean;
};

function VideoPlayer(props: VideoPlayerProps): JSX.Element {
  const { src, poster, isPlaying } = props;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadeddata = () => setIsLoading(false);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.onloadeddata = null;
        videoRef.current = null;
      }
    };
  }, [src]);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [isPlaying]);

  return (
    <div>
      <video
        className="player__video"
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        muted
      />
    </div>
  );
}
export default VideoPlayer;
