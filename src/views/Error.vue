<template>
  <section class="error">
    <div class="container">
      <div class="error__text">{{ message }}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Error",
  computed: {
    message() {
      let results = {
        "403": "Ошибка доступа",
        "404": "Данной страницы не существует",
        "500": "Внутренняя ошибка сервера"
      };

      let code = this.$route.params.code;
      if (!code || !results.hasOwnProperty(code))
        return results['404'];

      return results[code];
    }
  }
};
</script>

<style lang="scss">
.error {
  height: 100vh;
  display: flex;
  align-items: center;
  
  &__text {
    text-align: center;
    font-size: 2rem;
  }
}
  
</style>
