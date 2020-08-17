import Vue from "vue";
import Vuex from "vuex";
import planets from "./planets";

Vue.use(Vuex);

const state = {
  routeLoading: false,
  error: false
};

const mutations = {
  setRouteLoading(state, bool) {
    state.routeLoading = bool;
  },

  setError(state, error) {
    state.error = error;
  }
};

const getters = {
  routeLoading: s => s.routeLoading,
  error: s => s.error
};

const modules = {
  planets
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  modules
});
