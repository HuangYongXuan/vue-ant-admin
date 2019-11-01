<template>
    <a-drawer :visible="show" :width="width" :title="title" @close="show = false" :placement="placement">
        <slot/>
    </a-drawer>
</template>

<script>
    import MdActive from '@/components/mixins/MdActive';

    export default {
        name: 'MdDrawer',
        mixins: [MdActive],
        props: {
            width: String | Number,
            title: String,
            placement: {
                type: String,
                default: 'right'
            }
        },
        data () {
            return {}
        },
    };
</script>

<style scoped>

</style>
