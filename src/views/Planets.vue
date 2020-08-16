<template>
  <section id="section-main">
    <p>Root секция</p>
    <p>Ссылки:</p>
    <router-link :to="{ name: 'statistics' }">Статистика</router-link><br />
    <router-link :to="{ name: 'error' }">Error секция</router-link>
  </section>
</template>

<script>
export default {
  name: "Root",
};
</script>
<style lang="scss">
#section-main {

}
</style>