<template>
  <div class="footer">
    <h3 class="footer__text">
      Test task for Faceter company. Implementation: Sergey Yashanovsky.
    </h3>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {}
</script>

<style lang="scss">
$footer-bg: #404040;
.footer {
  background-color: $footer-bg;
  text-align: center;
  padding: 20px 15px;

  &__text {
    color: #fff;
    margin: 0;
    font-size: 1.1rem;
  }
}
</style>
