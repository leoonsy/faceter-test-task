import SWApi from '@/libs/swapi';

const api = new SWApi({
    postsPerPage: process.env.VUE_APP_POST_PER_PAGE
});

const state = {
    planets: []
};

const mutations = {
    setPlanets(state, planets) {
        state.planets = planets;
    }
};

const actions = {
    async getPlanets({ commit }, { start, limit }) {
        try {
           const planets = await api.getPlanets(start, limit);
        }
        catch (e) {
            commit('setError', true);
            throw e; 
        }
    }
};

const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters,
};