<template>
    <div class="md-container">
        <a-row :gutter="16">
            <responsive-col v-for="(c, i) in cards" :key="i">
                <md-data-card :icon="c.icon" :icon-style="c.iconStyle" :title="c.title" :subtitle="c.subtitle"
                              :left-norm="c.leftNorm" :right-norm="c.rightNorm" :norm-color="c.normColor" :to="{}"/>
            </responsive-col>
        </a-row>
        <a-row :gutter="16">
            <responsive-col :span="6" v-for="(c, i) in cards" :key="i">
                <md-data-card :icon="c.icon" :icon-style="c.iconStyle" :title="c.title" :subtitle="c.subtitle"
                              :left-norm="c.leftNorm" :right-norm="c.rightNorm" :norm-color="c.normColor" :to="{}"/>
            </responsive-col>
        </a-row>
        <a-row :gutter="16">
            <a-col :span="12" :xs="24">
                <md-base-e-chart :options="options" height="400px"/>
            </a-col>
            <responsive-col :span="6">
                <md-base-e-chart :options="options2" height="400px"/>
            </responsive-col>
            <responsive-col :span="6">
                <md-base-e-chart :options="options3" height="400px"/>
            </responsive-col>
            <a-col :span="24">
                <md-base-e-chart :options="options4" height="600px" ref="rf" :intercept="intercept"/>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import MdBaseEChart from '@/components/widget/chart/MdBaseEChart';
    import {option4} from '@/views/backstage/option/echartData';
    import MdDataCard from '@/components/widget/card/MdDataCard';
    import ResponsiveCol from '@/components/widget/ResponsiveCol';

    export default {
        components: {ResponsiveCol, MdDataCard, MdBaseEChart},
        data() {
            return {
                options: {
                    title: {
                        text: '堆叠区域图'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '邮件营销',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '联盟广告',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '视频广告',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name: '直接访问',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: [320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name: '搜索引擎',
                            type: 'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            areaStyle: {normal: {}},
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                },
                options2: {
                    angleAxis: {},
                    radiusAxis: {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四'],
                        z: 10
                    },
                    polar: {},
                    series: [{
                        type: 'bar',
                        data: [1, 2, 3, 4],
                        coordinateSystem: 'polar',
                        name: 'A',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [2, 4, 6, 8],
                        coordinateSystem: 'polar',
                        name: 'B',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [1, 2, 3, 4],
                        coordinateSystem: 'polar',
                        name: 'C',
                        stack: 'a'
                    }],
                    legend: {
                        show: true,
                        data: ['A', 'B', 'C']
                    }
                },
                options3: {
                    angleAxis: {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                        z: 10
                    },
                    radiusAxis: {},
                    polar: {},
                    series: [{
                        type: 'bar',
                        data: [1, 2, 3, 4, 3, 5, 1],
                        coordinateSystem: 'polar',
                        name: 'A',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [2, 4, 6, 1, 3, 2, 1],
                        coordinateSystem: 'polar',
                        name: 'B',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [1, 2, 3, 4, 1, 2, 5],
                        coordinateSystem: 'polar',
                        name: 'C',
                        stack: 'a'
                    }],
                    legend: {
                        show: true,
                        data: ['A', 'B', 'C']
                    }
                },
                options4: option4,
                cards: [
                    {
                        icon: 'user',
                        iconStyle: {color: '#fff', backgroundColor: '#66bb6a'},
                        title: 'VISIT TODAY',
                        subtitle: '100k+',
                        leftNorm: {
                            desc: 'PAGES/VISIT',
                            type: '8.55'
                        },
                        rightNorm: {
                            desc: '% NEW VIST',
                            type: '56.23%'
                        },
                        normColor: '#66bb6a'
                    },
                    {
                        icon: 'usergroup-add',
                        iconStyle: {color: '#fff', backgroundColor: '#00bcd4'},
                        title: '% UNIQUE VISITORS',
                        subtitle: '54.5%',
                        leftNorm: {
                            desc: 'AVG VISIT DURATION (S)',
                            type: '9.60'
                        },
                        normColor: '#00bcd4'
                    },
                    {
                        icon: 'md-icon-dollar',
                        iconStyle: {color: '#fff', backgroundColor: '#ffc107'},
                        title: '% EARNING GROWTH',
                        subtitle: '45.4%',
                        leftNorm: {
                            desc: 'ALAST WEEK',
                            type: '26.80%'
                        },
                        rightNorm: {
                            desc: 'LAST MONTH',
                            type: '39.33%'
                        },
                        normColor: '#ffc107'
                    },
                    {
                        icon: 'shopping-cart',
                        iconStyle: {color: '#fff', backgroundColor: '#2196f3'},
                        title: '% SALES GROWTH',
                        subtitle: '25.5%',
                        leftNorm: {
                            desc: 'ALAST WEEK',
                            type: '15.34%'
                        },
                        rightNorm: {
                            desc: 'LAST MONTH',
                            type: '20.01%'
                        },
                        normColor: '#2196f3'
                    }
                ]
            };
        },
        mounted() {
            setTimeout(() => {
                this.$refs.rf.update();
            }, 1000);
        },
        methods: {
            intercept() {
                let startTime = new Date().getTime();
                this.$utils.loadScripts('ax-bd-', [
                    'https://cdn.jsdelivr.net/npm/echarts-gl/dist/echarts-gl.min.js',
                    'https://cdn.jsdelivr.net/npm/echarts-stat/dist/ecStat.min.js',
                    'https://cdn.jsdelivr.net/npm/echarts/dist/extension/dataTool.min.js',
                    'https://cdn.jsdelivr.net/npm/echarts/map/js/china.js',
                    'https://cdn.jsdelivr.net/npm/echarts/map/js/world.js',
                    'https://api.map.baidu.com/getscript?v=2.0&ak=8E26vknnzSO3K48McCt3jcyUIjSsGGgw&services=&t=20191018173825',
                    'https://cdn.jsdelivr.net/npm/echarts/dist/extension/bmap.min.js'
                ]).then(() => {
                    console.info('time:', new Date().getTime() - startTime);
                    this.$refs.rf.init();
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    .md-container {
        .ant-row {
            > div {
                padding-bottom: 8px;
                padding-top: 8px;

                > div {
                    background: white;
                }
            }
        }
    }
</style>
