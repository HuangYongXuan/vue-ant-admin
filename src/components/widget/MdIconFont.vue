<template>
    <icon-font :type="icon"></icon-font>
</template>

<script>
    import { Icon } from 'ant-design-vue';

    const IconFont = Icon.createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_1522322_hnr0n540jif.js',
    });
    export default {
        name: 'MdIconFont',
        components: {IconFont},
        props: {
            icon: {
                type: String,
                required: true
            }
        }
    };
</script>

<style scoped>

</style>
