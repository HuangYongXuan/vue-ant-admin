<template>
    <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
    </transition>
</template>

<script>
    export default {
        name: 'BaseRouterView'
    };
</script>

<style scoped>

</style>
