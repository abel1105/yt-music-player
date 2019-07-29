<template>
  <div class="player">
    <div class="player-info">
      <h2>
        {{ current.title }}
        <md-icon>
          {{ current.isLove ? 'favorite' : 'favorite_border' }}
        </md-icon>
      </h2>
      <h3>{{ current.artist }}</h3>
    </div>
    <div class="player-status">
      <div class="player-control">
        <div
          class="player-button"
          :class="{ 'player-button--active': isShuffle }"
          @click="shuffle"
        >
          <md-icon>shuffle</md-icon>
        </div>
        <div class="player-button" @click="prev">
          <md-icon>skip_previous</md-icon>
        </div>
        <div
          class="player-button player-button--active"
          v-if="!isPlaying"
          @click="play"
        >
          <md-icon class="md-size-2x">play_circle_outline</md-icon>
        </div>
        <div class="player-button player-button--active" v-else @click="pause">
          <md-icon class="md-size-2x">pause_circle_outline</md-icon>
        </div>
        <div class="player-button" @click="next">
          <md-icon>skip_next</md-icon>
        </div>
        <div
          class="player-button"
          @click="repeat"
          :class="{ 'player-button--active': repeatMode }"
        >
          <md-icon>
            {{ repeatMode === 'one' ? 'repeat_one' : 'repeat' }}
          </md-icon>
        </div>
      </div>
      <div class="player-progress">
        <span>{{ nowTime }}</span>
        <div class="player-progress-bar" ref="progress" @click="seek">
          <md-progress-bar
            md-mode="buffer"
            :md-value="percentage"
            :md-buffer="bufferPercentage"
          ></md-progress-bar>
        </div>
        <span>{{ totalTime }}</span>
      </div>
      <div class="player-iframe" :class="{ 'player-iframe--show': showVideo }">
        <div id="player-iframe"></div>
      </div>
    </div>
    <div class="player-volume">
      <div @click="showVideo = !showVideo"><md-icon>music_video</md-icon></div>
      <md-icon>queue_music</md-icon>
      <md-icon>volume_up</md-icon>
      <input
        type="range"
        :value="volume"
        min="0"
        max="100"
        @change="onVolumeChange"
        @input="onVolumeChange"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import {
  getBuffer,
  getCurrentTime,
  pause,
  play,
  stop,
  seek,
  setVolume
} from '@/helpers/YoutubePlayer';

export default {
  name: 'player',
  data() {
    return {
      showVideo: false,
      isPlaying: false,
      isShuffle: false,
      duration: null,
      currentTime: null,
      buffer: null,
      intervalId: null,
      volume: 50
    };
  },
  computed: {
    percentage() {
      if (!this.currentTime || !this.duration) return 0;
      return (this.currentTime / this.duration) * 100;
    },
    bufferPercentage() {
      return this.buffer * 100;
    },
    index() {
      return this.$store.state.index;
    },
    current() {
      return this.$store.getters.current;
    },
    isLast() {
      return this.$store.getters.isLast;
    },
    repeatMode() {
      return this.$store.state.repeatMode;
    },
    nowTime() {
      if (!this.currentTime && this.isPlaying) return '00:00';
      if (!this.currentTime) return '';
      return `${_.padStart(
        Math.floor(this.currentTime / 60),
        2,
        '0'
      )}:${_.padStart(Math.floor(this.currentTime % 60), 2, '0')}`;
    },
    totalTime() {
      if (!this.duration) return '';
      return `${_.padStart(
        Math.floor(this.duration / 60),
        2,
        '0'
      )}:${_.padStart(Math.floor(this.duration % 60), 2, '0')}`;
    }
  },
  watch: {
    current(value, prev) {
      if (prev !== value) {
        this.stop();
        setTimeout(() => {
          this.play();
        }, 100);
      }
    }
  },
  methods: {
    play() {
      if (this.current) {
        play(this.current, this.onPlay, this.onPause, this.onEnd);
      }
    },
    onPlay(duration, currentTime) {
      this.isPlaying = true;
      this.duration = duration;
      this.currentTime = currentTime;
      this.intervalId = setInterval(() => {
        this.currentTime = getCurrentTime();
        this.buffer = getBuffer();
      }, 300);
    },
    clearInterval() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
    pause() {
      pause(this.onPause);
    },
    stop() {
      stop(this.onStop);
    },
    onPause() {
      this.clearInterval();
      this.isPlaying = false;
    },
    onStop() {
      this.clearInterval();
      this.isPlaying = false;
      this.duration = null;
      this.currentTime = null;
      this.buffer = null;
    },
    onEnd() {
      this.onStop();
      if (this.repeatMode === 'one') {
        this.play();
      } else if (!this.isLast || this.repeatMode === 'all') {
        this.$store.commit('nextSong');
        setTimeout(() => {
          this.play();
        }, 100);
      }
    },
    seek(e) {
      seek(
        (e.offsetX / this.$refs.progress.getBoundingClientRect().width) *
          this.duration
      );
    },
    next() {
      const isPlayingNow = this.isPlaying;
      this.stop();
      this.$store.commit('nextSong');
      if (isPlayingNow) {
        setTimeout(() => {
          this.play();
        }, 100);
      }
    },
    prev() {
      const isPlayingNow = this.isPlaying;
      this.stop();
      this.$store.commit('prevSong');
      if (isPlayingNow) {
        setTimeout(() => {
          this.play();
        }, 0);
      }
    },
    shuffle() {
      this.isShuffle = !this.isShuffle;
    },
    repeat() {
      this.$store.commit('toggleRepeatMode');
    },
    onVolumeChange(e) {
      this.volume = parseInt(e.target.value, 10);
      setVolume(this.volume);
    },
    toggleLove() {
      this.$store.commit('toggleLove', this.index);
    }
  }
};
</script>

<style lang="scss" scoped>
.player {
  width: 100vw;
  height: 135px;
  display: grid;
  background: $background;
  grid-template-columns: 350px auto 350px;
  align-items: center;
  padding: 0 30px;

  &-iframe {
    margin-top: 20px;
    position: absolute;
    top: -99999px;
    left: -99999px;
    width: 280px;
    height: 157px;

    &--show {
      top: unset;
      left: unset;
      bottom: 135px !important;
      right: 0 !important;
    }
  }

  &-info {
    h2 {
      color: $black;
    }

    h3 {
      font-weight: normal;
    }

    &-icon {
      font-weight: normal;

      &:first-child {
        margin-left: 10px;
      }
    }
  }

  &-control {
    width: 300px;
    margin: 0 auto 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-progress {
    display: flex;
    align-items: center;
    height: 20px;

    span {
      width: 40px;
    }

    &-bar {
      width: 100%;
      margin: 0 10px 0 10px;
      padding: 7.5px 0;
    }
  }

  &-volume {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    i {
      margin: 0 10px;
    }
  }

  &-button {
    margin: 0 10px;
    color: $grey;

    &--active {
      color: $black;
    }

    &:hover {
      color: $primary;
    }
  }
}
</style>

<style lang="scss">
.player {
  .md-progress-bar {
    &::before {
      content: '';
      position: absolute;
      top: -7.5px;
      width: 100%;
      height: 20px;
      z-index: 1;
    }
  }

  .md-progress-bar-fill {
    background: $primary;
    transition: width 0.1s !important;
  }

  .md-progress-bar-track {
    background: $primary_40;
  }

  .md-progress-bar-buffer {
    animation: none !important;
    border: none !important;
    background: $grey;
    margin-left: -8px;
  }
}
</style>
