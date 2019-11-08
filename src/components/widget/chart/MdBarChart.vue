<template>
    <md-base-chart :data="data" type="line"/>
</template>

<script>
    import Charts from 'chart.js';
    import MdBaseChart from '@/components/widget/chart/MdBaseChart';

    export default {
        name: 'MdBarChart',
        components: {MdBaseChart},
        props: {
            data: {
                type: Object,
                required: true
            }
        }
    };
</script>

<style scoped>

</style>
