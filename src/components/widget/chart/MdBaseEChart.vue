<template>
    <div class="md-base-e-chart" :id="id" :style="{height, width}">
    </div>
</template>

<script>
    import {generateUuid} from '@/common/Utils';
    import Debounce from '@/common/class/Debounce';

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
            },
            intercept: Function
        },
        data() {
            return {
                chart: null,
                debounce: new Debounce()
            };
        },
        created() {
        },
        mounted() {
            let startTime = new Date().getTime();
            this.$utils.loadScript('e-chart', 'https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js').then(() => {
                if (!this.intercept) {
                    this.init();
                } else {
                    this.intercept();
                }
            });
            this.$bus.on('side-on-collapse', this.update);
            window.addEventListener('resize', this._forceUpdate);
        },
        methods: {
            init() {
                this.chart = window.echarts.init(document.getElementById(this.id));
                this.chart.setOption(this.options);
                this.update();
            },
            update() {
                if (this.chart) {
                    setTimeout(() => {
                        this.chart.resize();
                    }, 300);
                }
            },
            _forceUpdate() {
                if (!this.chart) return;
                this.debounce.do(() => {
                    this.chart.resize();
                }, 200);
            }
        },
        beforeDestroy() {
            window.removeEventListener('resize', this._forceUpdate);
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
