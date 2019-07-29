import Vue from 'vue';
import Vuex from 'vuex';
import music from './data/music';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isPlaying: false,
    index: 0,
    list: music,
    repeatMode: false
  },
  getters: {
    current(state) {
      return state.index !== null ? state.list[state.index] : null;
    },
    isLast(state) {
      return state.index === state.list.length - 1;
    }
  },
  mutations: {
    nextSong(state) {
      if (state.index + 1 === state.list.length) {
        state.index = 0;
      } else {
        state.index += 1;
      }
    },
    prevSong(state) {
      if (state.index === 0) {
        state.index = state.list.length - 1;
      } else {
        state.index -= 1;
      }
    },
    toggleRepeatMode(state) {
      if (state.repeatMode === 'all') {
        state.repeatMode = 'one';
      } else if (state.repeatMode === 'one') {
        state.repeatMode = false;
      } else {
        state.repeatMode = 'all';
      }
    },
    toggleLove(state, index) {
      state.list = state.list.map((item, i) => {
        if (index === i) {
          return {
            ...item,
            isLove: !item.isLove
          };
        }
        return item;
      });
    },
    changeSong(state, index) {
      state.index = index;
    },
    startPlaying(state) {
      state.isPlaying = true;
    },
    stopPlaying(state) {
      state.isPlaying = false;
    }
  },
  actions: {}
});
