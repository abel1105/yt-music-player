import Vue from 'vue';
import Vuex from 'vuex';
import music from './data/music';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    index: 0,
    list: music
  },
  getters: {
    current(state) {
      return state.index !== null ? state.list[state.index] : null;
    }
  },
  mutations: {},
  actions: {}
});
