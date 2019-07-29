let player = null;

const onReady = onPlay => event => {
  event.target.playVideo();
  player.setVolume(50);
  onPlay(player.getDuration(), player.getCurrentTime());
};

const onStateChange = (onPlay, onPause, onEnd) => event => {
  if (event.data === window.YT.PlayerState.PLAYING) {
    onPlay(player.getDuration(), player.getCurrentTime());
  } else if (event.data === window.YT.PlayerState.PAUSED) {
    onPause();
  } else if (event.data === window.YT.PlayerState.ENDED) {
    player.destroy();
    player = null;
    onEnd();
  }
};

export const play = (music, onPlay, onPause, onEnd) => {
  if (!player) {
    player = new window.YT.Player('player-iframe', {
      height: '390',
      width: '640',
      videoId: music.videoId,
      events: {
        onReady: onReady(onPlay),
        onStateChange: onStateChange(onPlay, onPause, onEnd)
      }
    });
  } else {
    player.playVideo();
    onPlay(player.getDuration(), player.getCurrentTime());
  }
};

export const pause = cb => {
  if (player) {
    player.pauseVideo();
    cb();
  }
};

export const stop = cb => {
  if (player) {
    player.destroy();
    player = null;
    cb();
  }
};

export const seek = number => {
  if (player) player.seekTo(number);
};

export const getCurrentTime = () => {
  if (!player || typeof player.getCurrentTime !== 'function') return null;
  return player.getCurrentTime();
};

export const getBuffer = () => {
  if (!player || typeof player.getVideoLoadedFraction !== 'function')
    return null;
  return player.getVideoLoadedFraction();
};

export const setVolume = number => {
  if (player) player.setVolume(number);
};
