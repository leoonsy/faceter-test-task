<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <component :is="this.$route.meta.layout || 'div'">
      <router-view />
    </component>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';
@Component({
  metaInfo() {
    return {
      title: 'Main',
      titleTemplate: '%s · Faceter test'
    };
  }
})
export default class App extends Vue {
  @State(state => state.info.routeLoading) routeLoading!: boolean;
  $Progress: any;

  //при каждом изменении роута показывать или скрывать прогресс бар
  @Watch('routeLoading')
  onRouteLoading(newValue: boolean) {
    if (newValue) this.$Progress.start();
    else this.$Progress.finish();
  }
}
</script>
<style lang="scss">
#app {
  height: 100%;
}
</style>
