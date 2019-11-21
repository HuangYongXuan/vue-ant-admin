<template>
    <icon-font :type="icon"></icon-font>
</template>

<script>
    import { Icon } from 'ant-design-vue';

    const IconFont = Icon.createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_1522322_7wsd3kcnaz3.js'
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
