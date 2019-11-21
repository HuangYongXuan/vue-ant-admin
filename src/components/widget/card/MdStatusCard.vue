<template>
    <div class="md-status-card" @click="goto" :class="{'md-link': isLink}">
        <div class="top">
            <span v-if="!switched" class="header">{{header}}</span>
            <span v-else>
                <a-icon :type="icon" v-if="!isIconFont" :style="{color, fontSize}"></a-icon>
                <md-icon-font :icon="icon" v-else :style="{color,fontSize}"/>
            </span>
        </div>
        <div class="info">
            <span>{{title}}</span>
        </div>
        <div class="bottom">
            <span v-if="switched" class="header">{{header}}</span>
            <span v-else>
                <a-icon :type="icon" v-if="!isIconFont" :style="{color}"></a-icon>
                <md-icon-font :icon="icon" v-else :style="{color,fontSize}"/>
            </span>
        </div>
    </div>
</template>

<script>
    import MdCardMixin from '@/components/widget/card/MdCardMixin';
    import MdIconFont from '@/components/widget/MdIconFont';

    export default {
        name: 'MdStatusCard',
        components: {MdIconFont},
        mixins: [MdCardMixin],
        props: {
            header: String,
            switched: Boolean,
            color: String,
            fontSize: {
                type: String,
                default: '35px'
            }
        }
    };
</script>

<style scoped lang="scss">
    .md-status-card {
        box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
        position: relative;
        border-radius: .2rem;
        background-color: #fff;
        margin-bottom: 1.5rem;
        height: 224px;
        display: flex;
        flex-direction: column;

        > div {
            flex: 1;
            flex-direction: row;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .info {
            position: absolute;
            left: 0;
            right: 0;
            height: 0;
            top: 50%;
            border-bottom: 1px solid rgba(0, 0, 0, .1);

            span {
                display: inline-block;
                height: 1.5rem;
                padding: .25rem .625rem;
                text-transform: uppercase;
                line-height: 14px;
                background-color: #fff;
                border: 1px solid rgba(0, 0, 0, .1);
                font-size: .75rem;
                color: #868e96;
                border-radius: 1em;
            }
        }

        .header {
            font-size: 2.5rem;
            font-weight: 300;
        }
    }
</style>
