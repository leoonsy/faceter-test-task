<template>
  <section class="error">
    <div class="container">
      <div class="error__text">{{ message }}</div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  metaInfo() {
    return {
      title: 'Error'
    };
  }
})
export default class Error extends Vue {
  get message() {
    let results: any = {
      '403': 'Access error',
      '404': 'Page not found',
      '500': 'Internal server error'
    };

    let code = this.$route.params.code;
    if (!code || !results[code]) return results['404'];

    return results[code];
  }
}
</script>

<style lang="scss">
.error {
  display: flex;
  flex: 1 0 100%;
  position: relative;
  align-items: center;
  text-align: center;

  &__text {
    font-size: 2rem;
  }
}
</style>
