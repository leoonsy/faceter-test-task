<template>
    <div class="text-primary">
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Loader"
    }
</script>
<style lang="scss" scoped>
    .spinner-border {
        width: 60px;
        height: 60px;
    }
</style>