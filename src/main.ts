import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/styles/main.scss";
import VueProgressBar from "vue-progressbar";
import Toasted from "vue-toasted";

Vue.use(Toasted);
Vue.use(VueProgressBar, {
  color: "rgb(53,120,255)",
  failedColor: "red",
  height: "6px",
  autoFinish: false
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
