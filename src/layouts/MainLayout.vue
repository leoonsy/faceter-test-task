<template>
  <div class="wrapper">
    <header>
      <NavBar :links="links"></NavBar>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>
<script lang="ts">
import NavBar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component({
  components: {
    NavBar,
    Footer
  }
})
export default class MainLayout extends Vue {
  links = [
    {
      name: 'planets',
      title: 'Planets'
    },
    {
      name: 'statistics',
      title: 'Statistics'
    }
  ];

  @State(state => state.info.error) error: any;

  @Watch('error')
  onError() {
    this.$toasted.show('An error has occurred', {
      theme: 'toasted-primary',
      position: 'top-right',
      duration: 5000
    });
  }
}
</script>
<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

header {
  flex: 0 0 auto;
}

main {
  flex: 1 0 auto;
  display: flex !important;
  flex-direction: column;
}

footer {
  flex: 0 0 auto;
}
</style>
