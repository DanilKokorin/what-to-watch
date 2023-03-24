import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useVideoPlayer = (videoElement: any) => {
  const navigate = useNavigate();

  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
    isElapsedRuntimeMode: false,
    isFullscreen: false,
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  useEffect(() => {
    playerState.isPlaying
      ? videoElement.current.play()
      : videoElement.current.pause();
  }, [playerState.isPlaying, videoElement]);

  const toggleElapsedRuntimeMode = () => {
    setPlayerState({
      ...playerState,
      isElapsedRuntimeMode: !playerState.isElapsedRuntimeMode,
    });
  };

  useEffect(() => {
    playerState.isElapsedRuntimeMode ? getElapsedRuntime() : getFullRuntime();
  }, [playerState.isElapsedRuntimeMode, videoElement]);

  const getElapsedRuntime = () => {
    if (videoElement.current) {
      const runtime =
        (videoElement.current.duration - videoElement.current.currentTime) / 60;
      let hours: any = Math.floor(runtime / 60);
      let minutes: any = Math.floor(runtime - hours * 60);
      let seconds: any = Math.floor(runtime * 60 - hours * 3600 - minutes * 60);

      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      return hours === 0
        ? `${hours}:${minutes}:${seconds}`
        : `${minutes}:${seconds}`;
    }
  };

  const getFullRuntime = () => {
    if (videoElement.current) {
      const time =
        Math.floor(videoElement.current.currentTime / 60) +
        ':' +
        ('0' + Math.floor(videoElement.current.currentTime % 60)).slice(-2);

      return time;
    }
  };

  const handleOnTimeUpdate = () => {
    if (isNaN(videoElement.current.duration)) return;
    const progress =
      (videoElement.current.currentTime / videoElement.current.duration) * 100;
    setPlayerState({
      ...playerState,
      progress,
    });
  };

  const handleVideoProgress = (event: any) => {
    const manualChange = Number(event.target.value);
    videoElement.current.currentTime =
      (videoElement.current.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };

  const handleVideoSpeed = (event: any) => {
    const speed = Number(event.target.value);
    videoElement.current.playbackRate = speed;
    setPlayerState({
      ...playerState,
      speed,
    });
  };

  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });
  };

  useEffect(() => {
    playerState.isMuted
      ? (videoElement.current.muted = true)
      : (videoElement.current.muted = false);
  }, [playerState.isMuted, videoElement]);

  const goBackOnExitPlayer = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      // the current entry in the history stack will be replaced with the new one { replace: true }
      navigate('/', { replace: true });
    }
  };

  const handleForward = () => {
    if (videoElement.current) {
      videoElement.current.currentTime += 20;
    }
  };

  const handleRewind = () => {
    if (videoElement.current) {
      videoElement.current.currentTime -= 20;
    }
  };

  const toggleFullScreen = (event: any) => {
    event.preventDefault();
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // const toggleFullScreen = () => {
  //   setPlayerState({
  //     ...playerState,
  //     isFullscreen: !playerState.isFullscreen,
  //   });
  // };

  // useEffect(() => {
  //   playerState.isMuted
  //     ? (videoElement.current.fullscreen = true)
  //     : (videoElement.current.fullscreen = false);
  // }, [playerState.isFullscreen, videoElement]);

  return {
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
  };
};

export default useVideoPlayer;
