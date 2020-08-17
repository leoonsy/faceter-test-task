<template>
  <section id="section-login">
    <p>Login секция</p>
    <p>Ссылки:</p>
    <router-link :to="{ name: 'planets' }">Планеты</router-link><br />
    <router-link :to="{ name: 'error' }">Error секция</router-link>
  </section>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style lang="scss">

</style>
