<template>
    <div class="md-base-e-chart" :id="id" :style="{height, width}">
    </div>
</template>

<script>
    import {generateUuid} from '@/common/Utils';
    import echarts from 'echarts';

    export default {
        name: 'MdBaseEChart',
        props: {
            id: {
                type: String,
                default: () => generateUuid('v-', 10)
            },
            options: {
                type: Object,
                required: true
            },
            width: {
                type: String | Number,
                default: '100%'
            },
            height: {
                type: String | Number,
                default: '100%'
            }
        },
        data() {
            return {
                chart: null
            };
        },
        mounted() {
            this.init();
            this.$bus.on('side-on-collapse', this.update);
        },
        methods: {
            init() {
                this.chart = echarts.init(document.getElementById(this.id));
                this.chart.setOption(this.options);
                this.update();
            },
            update() {
                if (this.chart) {
                    setTimeout(() => {
                        this.chart.resize();
                    }, 300);
                }
            }
        },
        beforeDestroy() {
            if (!this.chart) {
                return;
            }
            this.chart.dispose();
            this.chart = null;
        }
    };
</script>

<style scoped>

</style>
