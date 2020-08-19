import Vue from "vue";
import Vuex from "vuex";
import info from "./modules/info";
import planets from "./modules/planets";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    info,
    planets
  }
});
