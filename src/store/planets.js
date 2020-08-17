import SWApi from '@/libs/swapi';

const actions = {
    async getPlanetsInfo({ commit }) {
        try {
            return await SWApi.getPlanetsInfo();
        } catch (e) {
            commit('setError', true);
            throw e;
        }
    },
    
    async getPlanets({ commit }, { start, limit, planetsPerPage }) {
        try {
           return await SWApi.getPlanets(start, limit, planetsPerPage);
        }
        catch (e) {
            commit('setError', true);
            throw e; 
        }
    },

    async getPlanetById({ commit }, id) {
        try {
            return await SWApi.getPlanetById(id);
        } catch (e) {
            commit('setError', true);
            throw e;
        }
    },
};


export default {
    actions,
};