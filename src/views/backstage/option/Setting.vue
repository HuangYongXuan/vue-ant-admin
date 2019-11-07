<template>
    <div class="md-setting">
        <md-tiny-m-c-e id="setting-editor" :options="{height: 800}"></md-tiny-m-c-e>
    </div>
</template>

<script>
    import MdTinyMCE from '@/components/widget/editor/MdTinyMCE';
    export default {
        components: {MdTinyMCE}
    };
</script>

<style scoped lang="scss">
    .md-setting {
        background-color: white;
        min-height: 200px;
        padding: 10px;
    }
</style>
