<template>
    <div class="footer">
        <h3 class="footer__text">Тестовое задание для компании Faceter. Реализация: Сергей Яшановский.</h3>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style lang="scss" scoped>
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