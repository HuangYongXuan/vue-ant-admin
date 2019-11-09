<template>
    <div :style="{width: width, height: height}">
        <canvas :id="id" :width="width" :height="height"></canvas>
    </div>
</template>

<script>
    import ChartMixins from '@/components/widget/chart/mixins/ChartMixins';
    import {generateUuid} from '@/common/Utils';
    import Charts from 'chart.js';

    export default {
        name: 'MdBaseChart',
        mixins: [ChartMixins],
        props: {
            id: {
                type: String,
                default: () => generateUuid('charts-')
            },
            width: {
                type: String | Number,
                default: 'auto'
            },
            height: {
                type: String | Number
            },
            data: {
                type: Object,
                required: true
            },
            type: {
                type: String,
                required: true,
            }
        },
        data () {
            return {
                chart: undefined
            }
        },
        computed: {
            chartData () {
                return {
                    type: this.type,
                    data: this.data
                }
            }
        },
        mounted () {
            this.init();
            this.$bus.on('side-on-collapse', this.update)
        },
        methods: {
            init () {
                let ctx = document.getElementById(this.id);
                this.chart = new Charts(ctx, this.chartData);
                window.chart = this.chart;
            },
            update () {
                setTimeout(()=> {
                    this.chart.resize();
                }, 350)
            }
        },
        watch: {
            chartData (n) {
                this.chart.update(n);
            }
        },
        beforeDestroy () {
            this.chart.destroy()
        }
    };
</script>

<style scoped>

</style>
