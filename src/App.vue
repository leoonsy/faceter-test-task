<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <component :is="this.$route.meta.layout || 'div'">
      <router-view />
    </component>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState(["routeLoading"])
  },
  watch: {
    routeLoading: function(newValue) {
      if (newValue) this.$Progress.start();
      else this.$Progress.finish();
    }
  }
};
</script>
<style lang="scss"></style>
