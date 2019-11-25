<template>
    <canvas :id="id" :ref="id" :width="width" :height="height" :style="{width, height}"></canvas>
</template>

<script>


    import {generateUuid} from '@/common/Utils';

    export default {
        name: 'IndexParticle',
        props: {
            id: {
                type: String,
                default: () => generateUuid('par-')
            },
            height: {
                type: String,
                default: '100%'
            },
            width: {
                type: String,
                default: '100%'
            },
            particlesNum: {
                type: Number,
                default: 150
            }
        },
        data() {
            return {
                canvas: null,
                ctx: null,
                warea: {x: null, y: null, max: 20000},
                dots: [],
                rafId: undefined
            };
        },
        mounted() {
            this.init();
        },
        beforeDestroy() {
            this.clearRaf();
            this.removeEvent();
        },
        methods: {
            init() {
                this.canvas = document.getElementById(this.id);
                this.ctx = this.canvas.getContext('2d');
                this.resize();
                this.addEvent();
                this.computedDots();
            },
            addEvent() {
                window.addEventListener('resize', this.resize);
                window.addEventListener('mousemove', this.onMouseMove);
                window.addEventListener('mouseout', this.onMouseOut);
            },
            removeEvent() {
                window.removeEventListener('resize', this.resize);
                window.removeEventListener('mousemove', this.onMouseMove);
                window.removeEventListener('mouseout', this.onMouseOut);
            },
            resize() {
                this.canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                this.canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            },
            onMouseMove(e) {
                this.warea.x = e.clientX;
                this.warea.y = e.clientY;
            },
            onMouseOut() {
                this.warea.x = null;
                this.warea.y = null;
            },
            computedDots() {
                this.dots = [];
                for (let i = 0; i < this.particlesNum; i++) {
                    let x = Math.random() * this.canvas.width;
                    let y = Math.random() * this.canvas.height;
                    let xa = Math.random() * 2 - 1;
                    let ya = Math.random() * 2 - 1;
                    this.dots.push({
                        x: x,
                        y: y,
                        xa: xa,
                        ya: ya,
                        max: 6000
                    });
                }
                setTimeout(this.animate, 100);
            },
            animate() {
                let canvas = this.canvas;
                this.ctx.clearRect(0, 0, canvas.width, canvas.height);
                let nDots = [this.warea].concat(this.dots);

                this.dots.forEach(dot => {
                    // 粒子位移
                    dot.x += dot.xa;
                    dot.y += dot.ya;
                    // 遇到边界将加速度反向
                    dot.xa *= (dot.x > canvas.width || dot.x < 0) ? -1 : 1;
                    dot.ya *= (dot.y > canvas.height || dot.y < 0) ? -1 : 1;
                    // 绘制点
                    this.ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);
                    for (let i = 0; i < nDots.length; i++) {
                        let d2 = nDots[i];
                        if (dot === d2 || d2.x === null || d2.y === null) continue;
                        let xc = dot.x - d2.x;
                        let yc = dot.y - d2.y;
                        // 两个粒子之间的距离
                        let dis = xc * xc + yc * yc;
                        // 距离比
                        let ratio;
                        // 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
                        if (dis < d2.max) {
                            // 如果是鼠标，则让粒子向鼠标的位置移动
                            if (d2 === this.warea && dis > (d2.max / 2)) {
                                dot.x -= xc * 0.01;
                                dot.y -= yc * 0.01;
                            }
                            // 计算距离比
                            ratio = (d2.max - dis) / d2.max;
                            // 画线
                            this.ctx.beginPath();
                            this.ctx.lineWidth = ratio / 2;
                            this.ctx.strokeStyle = 'rgba(30,144,255,' + (ratio + 0.2) + ')';
                            this.ctx.moveTo(dot.x, dot.y);
                            this.ctx.lineTo(d2.x, d2.y);
                            this.ctx.stroke();
                        }
                    }
                    // 将已经计算过的粒子从数组中删除
                    nDots.splice(nDots.indexOf(dot), 1);
                });
                this.RAF(this.animate);
            },
            RAF(func) {
                this.clearRaf();
                this.rafId = window.requestAnimationFrame(func);
            },
            clearRaf() {
                if (this.rafId !== undefined) {
                    window.cancelAnimationFrame(this.rafId)
                }
                this.rafId = undefined;
            }
        }
    };
</script>

<style scoped>

</style>
