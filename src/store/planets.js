import SWApi from '@/libs/swapi';

const api = new SWApi({
    postsPerPage: process.env.VUE_APP_POST_PER_PAGE
});

const actions = {
    async getPlanets({ commit }, { start, limit }) {
        try {
           return await api.getPlanets(start, limit);
        }
        catch (e) {
            commit('setError', true);
            throw e; 
        }
    },

    async getPlanetsCount({ commit }) {
        try {
            return await api.getPlanetsCount();
        }
        catch (e) {
            commit('setError', true);
            throw e;
        }
    }
};


export default {
    actions,
};