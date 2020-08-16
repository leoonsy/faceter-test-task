import Vue from 'vue';
import Vuex from 'vuex';
import planets from './planets';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    error: false,
  },
  mutations: {
    setLoading(state, bool) {
      state.loading = bool;
    }
  },
  actions: {
  },
  getters: {
    loading: s => s.loading
  },
  modules: {
    planets
  }
});
