import SWApi from "@/libs/swapi";

const actions = {
  async getPlanetsInfo({ commit }) {
    try {
      return await SWApi.getPlanetsInfo();
    } catch (e) {
      commit("setError", e);
      throw e;
    }
  },

  async getPlanets(
    { commit },
    { planetsPerPage, planetsCount, startPlanet, limit }
  ) {
    try {
      return await SWApi.getPlanets(
        planetsPerPage,
        planetsCount,
        startPlanet,
        limit
      );
    } catch (e) {
      commit("setError", e);
      throw e;
    }
  },

  async getPlanetById({ commit }, id) {
    try {
      return await SWApi.getPlanetById(id);
    } catch (e) {
      commit("setError", e);
      throw e;
    }
  },

  async getStatistics({ commit }) {
    try {
      return await SWApi.getStatistics();
    } catch (e) {
      commit("setError", e);
      throw e;
    }
  }
};

export default {
  actions
};
