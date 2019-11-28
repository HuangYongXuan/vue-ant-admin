<template>
    <div class="md-panel">
        <div class="title">
            <slot name="title">{{title}}</slot>
        </div>
        <div class="content">
            <slot/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MdPanel',
        props: {
            title: String
        }
    };
</script>

<style scoped lang="scss">
    @import "index";
</style>