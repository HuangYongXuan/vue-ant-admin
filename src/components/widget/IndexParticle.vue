<template>
    <canvas width="100%" height="100%" ref="canvas"></canvas>
</template>

<script>
    let canvas;
    let ctx;
    let w, h;
    let particles;
    let spawnrate;
    let rId;

    class Particle {
        constructor(x, y) {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = Math.random() * 5;
            this.vy = Math.random() * -0.5;
            this.hue = Math.random() * 260;
            this.tick = 80;
        }

        move() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.05;
            this.tick -= 1;
        }

        draw() {
            ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, 0.5)`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    export default {
        name: 'IndexParticle',
        data() {
            return {};
        },
        mounted() {
            this.setup();
            this.draw();
        },
        destroyed() {
            console.info('destroyed');
            window.removeEventListener('resize', this.reset);
            cancelAnimationFrame(rId);
        },
        methods: {
            setup() {
                canvas = this.$refs.canvas;
                ctx = canvas.getContext('2d');
                this.reset();
                particles = [];
                window.addEventListener('resize', this.reset);
            },
            reset() {
                w = canvas.width = window.innerWidth;
                h = canvas.height = window.innerHeight;
                spawnrate = w * h / 1000000;
            },
            draw() {
                rId = requestAnimationFrame(this.draw);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                ctx.fillRect(0, 0, w, h);
                for (let i = 0; i < spawnrate; i++) {
                    let particle = new Particle(w / 2, h);
                    particles.push(particle);
                }
                for (let i = particles.length - 1; i >= 0; i--) {
                    let p = particles[i];
                    p.move();
                    p.draw();
                    if (p.tick < 0) {
                        particles.splice(i, 1);
                    }
                }
            }
        }
    };
</script>

<style scoped>

</style>