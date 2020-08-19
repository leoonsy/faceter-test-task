<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <component :is="this.$route.meta.layout || 'div'">
      <router-view />
    </component>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
@Component
export default class App extends Vue {
  @State(state => state.info.routeLoading) routeLoading!: boolean;
  $Progress: any;

  @Watch("routeLoading")
  onRouteLoading(newValue: boolean) {
    if (newValue) this.$Progress.start();
    else this.$Progress.finish();
  }
}
</script>
<style lang="scss"></style>
