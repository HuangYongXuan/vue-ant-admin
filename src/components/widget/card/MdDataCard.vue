<template>
    <div class="md-data-card" :class="{'md-link': isLink}" @click="goto">
        <div class="md-box-top">
            <div class="md-box-top-icon">
                <a-avatar v-if="isIconFont" :style="iconStyle">
                    <md-icon-font :icon="icon"/>
                </a-avatar>
                <a-avatar :icon="icon" :style="iconStyle" v-else/>
            </div>
            <div class="md-box-top-info">
                <p>{{title}}</p>
                <p>{{subtitle}}</p>
            </div>
        </div>
        <div class="md-box-bottom">
            <div class="md-box-bottom-left" v-if="leftNorm">
                <p>{{leftNorm.desc}}</p>
                <p :style="{color: normColor}">{{leftNorm.type}}</p>
            </div>
            <div class="md-box-bottom-right" v-if="rightNorm">
                <p>{{rightNorm.desc}}</p>
                <p :style="{color: normColor}">{{rightNorm.type}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import MdIconFont from '@/components/widget/MdIconFont';

    export default {
        name: 'MdDataCard',
        components: {MdIconFont},
        props: {
            icon: {
                type: String
            },
            iconStyle: {
                type: Object
            },
            title: {
                type: String
            },
            subtitle: {
                type: String
            },
            leftNorm: {
                type: Object
            },
            rightNorm: {
                type: Object
            },
            normColor: {
                type: String
            },
            to: {
                type: Object
            }
        },
        computed: {
            isIconFont() {
                return this.icon && this.icon.indexOf('md-icon') !== -1;
            },
            isLink() {
                return this.to;
            }
        },
        methods: {
            goto() {
                if (this.isLink === false) return;
                this.$router.push(this.to);
            }
        }
    };
</script>

<style scoped lang="scss">
    .md-data-card {
        background: white;
        box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
        padding: 15px;
        border-radius: .2rem;
        margin-bottom: 1.5rem;
    }

    p {
        margin: 0;
        line-height: 1.35;
    }

    .md-box-top {
        display: flex;

        .md-box-top-icon {
            flex: 0 0 32px;
            display: flex;
            justify-items: center;
            align-items: center;
        }

        .md-box-top-info {
            flex: 1;
            padding-left: 10px;

            > p {

                &:first-child {
                    color: #ababab;
                    text-transform: uppercase;
                    font-size: .75rem;
                }

                &:last-child {
                    font-weight: 400;
                    font-size: 1.1rem;
                }
            }
        }
    }

    .md-box-bottom {
        display: flex;
        margin-top: 52px;
        justify-content: space-between;

        > div {
            > p {
                &:first-child {
                    color: #ababab;
                    text-transform: uppercase;
                    font-size: .75rem;
                }

                &:last-child {

                }
            }
        }

        .md-box-bottom-left {

        }

        .md-box-bottom-right {
            text-align: right;
        }
    }
</style>
