<template>
    <transition name="list">
        <div class="md-image-preview" v-if="show">
            <div class="md-prev md-action" v-if="showAction">
                <a-icon type="left" @click.native="operation('prev')"/>
            </div>
            <div class="md-preview">
                <div class="md-close-btn">
                    <a-icon type="close" @click="show = false"/>
                </div>
                <transition :name="moveAnimation" mode="out-in">
                    <img :src="imgSrc" alt="" @load="onImageLoad" :width="width" :height="height" v-show="imageShow">
                </transition>
            </div>
            <div class="md-next md-action" v-if="showAction">
                <a-icon type="right" @click.native="operation('next')"/>
            </div>
            <div class="md-show-bar" v-if="showAction">
                <span>{{current + 1}} / {{images.length}}</span>
            </div>
        </div>
    </transition>
</template>

<script>
    import MdActive from '@/components/mixins/MdActive';

    export default {
        name: 'MdImagePreview',
        mixins: [MdActive],
        props: {
            src: String,
            images: Array
        },
        data() {
            return {
                current: 0,
                width: 0,
                height: 0,
                image: {
                    width: 0,
                    height: 0
                },
                imageShow: true,
                moveTimer: null,
                moveAnimation: ''
            };
        },
        created() {
            this.computedCurrent();
            window.addEventListener('resize', this.resize);
        },
        computed: {
            imgSrc() {
                if (Array.isArray(this.images) && this.images.length > 0) {
                    return this.images[this.current];
                } else {
                    return this.src;
                }
            },
            showAction() {
                return Array.isArray(this.images) && this.images.length > 0;
            }
        },
        methods: {
            computedCurrent() {
                if (Array.isArray(this.images) && this.images.length > 0) {
                    this.current = this.images.indexOf(this.src);
                }
            },
            onImageLoad() {
                let image = new Image();
                image.src = this.imgSrc;
                image.onload = () => {
                    this.image = {
                        width: image.width,
                        height: image.height
                    };
                    this.resize();
                };
            },
            prev() {
                if (this.current <= 0) {
                    this.current = this.images.length - 1;
                } else {
                    this.current -= 1;
                }
            },
            next() {
                if (this.current >= this.images.length - 1) {
                    this.current = 0;
                } else {
                    this.current += 1;
                }
            },
            doImageShow(action) {
                this.clearMoveTimer(action);
                this.moveTimer = setTimeout(() => {
                    this.imageShow = true;
                    this.moveTimer = null;
                    this[action]();
                }, 350);
            },
            resize() {
                let maxWidth = window.innerHeight - 160, maxHeight = window.innerWidth - 160;
                let hRatio;
                let wRatio;
                let Ratio = 1;
                let w = this.image.width;
                let h = this.image.height;
                wRatio = maxWidth / w;
                hRatio = maxHeight / h;
                if (maxWidth === 0 && maxHeight === 0) {
                    Ratio = 1;
                } else if (maxWidth === 0) {//
                    if (hRatio < 1) Ratio = hRatio;
                } else if (maxHeight === 0) {
                    if (wRatio < 1) Ratio = wRatio;
                } else if (wRatio < 1 || hRatio < 1) {
                    Ratio = (wRatio <= hRatio ? wRatio : hRatio);
                }
                if (Ratio < 1) {
                    w = w * Ratio;
                    h = h * Ratio;
                }
                this.height = h;
                this.width = w;
            },
            async clearMoveTimer(action) {
                this.imageShow = true;
                if (this.moveTimer !== null) {
                    this[action]();
                    clearTimeout(this.moveTimer);
                }
                this.moveTimer = null;
                await this.$nextTick();
                this.imageShow = false;
            },
            operation(action) {
                this.moveAnimation = action;
                this.doImageShow(action);
            }
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.resize);
        }
    };
</script>

<style scoped lang="scss">
    .md-image-preview {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .7);
        display: flex;
        justify-items: center;
        align-items: center;
        text-align: center;

        .md-close-btn,
        .md-action {
            position: absolute;
            z-index: 8;
            top: 0;
            bottom: 0;
            width: 80px;
            background-color: rgba(0, 0, 0, .1);
            color: white;
            display: flex;
            justify-items: center;
            align-items: center;

            .anticon {
                font-size: 20px;
                line-height: 80px;
                width: 80px;
                display: inline-block;
                cursor: pointer;
                background-color: rgba(0, 0, 0, 0);
                transition: background-color .3s;

                &:hover {
                    background-color: rgba(0, 0, 0, .3);
                }
            }
        }

        .md-close-btn {
            right: 0;
            top: 0;
            left: initial;
            bottom: initial;
            z-index: 10;
            background-color: transparent;
        }

        .md-next {
            right: 0;
        }

        .md-prev {
            left: 0;
        }

        .md-show-bar {
            position: fixed;
            left: 80px;
            right: 80px;
            height: 80px;
            bottom: 0;
            color: white;
            background-color: rgba(0, 0, 0, .1);
            line-height: 80px;
        }
    }

    .md-preview {
        text-align: center;
        max-width: calc(100% - 160px);
        max-height: calc(100% - 160px);
        margin: 0 auto;
    }

    @media screen and(max-width: 576px) {
        .md-image-preview {
            width: 100%;

            .md-preview {
                margin: 0;
                width: 100%;
                max-width: 100%;

                img {
                    width: 100%;
                    height: auto;
                }
            }
        }
    }
</style>

<style>

</style>
