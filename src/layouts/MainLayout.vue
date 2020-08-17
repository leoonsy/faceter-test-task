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
<script>
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  name: "MainLayout",
  data: () => ({
    links: [
      {
        name: "planets",
        title: "Planets"
      },
      {
        name: "statistics",
        title: "Statistics"
      }
    ]
  }),
  components: {
    NavBar,
    Footer
  },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(e) {
      this.$toasted.show("An error has occurred", {
        theme: "toasted-primary",
        position: "top-right",
        duration: 5000
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  flex: 0 1 auto;
}

main {
  flex: 1 1 auto;
  display: flex !important;
  flex-direction: column;
}

footer {
  flex: 0 0 auto;
}
</style>
