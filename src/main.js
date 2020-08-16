import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import SWApi from './libs/swapi';
import "@/assets/styles/main.scss";
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: 'rgb(53,120,255)',
  failedColor: 'red',
  height: '6px',
  autoFinish: false
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

(async () => {
  const swApi = new SWApi();
  const planets = await swApi.getPlanets(10, 2);
  console.log(planets);
  // const planet = await SWApi.getPlanetById(1);
  // console.log(planet);
})();
