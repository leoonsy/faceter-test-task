<template>
  <div class="text-primary">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Loader extends Vue {}
</script>
<style lang="scss">
.spinner-border {
  width: 60px;
  height: 60px;
}
</style>
