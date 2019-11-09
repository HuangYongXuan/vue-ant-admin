<template>
    <markdown-pro v-model="data" :theme="theme" :width="width" :height="height" :toolbars="toolbars"
                  :bordered="bordered" :auto-save="autoSave" :interval="interval" :exportFileName="exportFileName"
                  :markedOptions="markedOptions" :copyCode="copyCode" :copyBtnText="copyBtnText"
                  :isPreview="isPreview"/>
</template>

<script>
    import MdMVVMObject from '@/components/mixins/MdMVVMObject';
    import {MarkdownPro} from 'vue-meditor';

    export default {
        name: 'MdMarkdown',
        components: {MarkdownPro},
        mixins: [MdMVVMObject],
        props: {
            value: {
                type: [String, Number],
                default: ''
            },
            theme: {// 默认主题
                type: String,
                default: 'light'
            },
            width: {// 初始化宽度
                type: [Number, String],
                default: 'auto'
            },
            height: {// 初始化高度
                type: Number,
                default: 600
            },
            toolbars: {// 工具栏
                type: Object,
                default() {
                    return {};
                }
            },
            bordered: {//是否有边框
                type: Boolean,
                default: true
            },
            autoSave: {// 是否自动保存
                type: Boolean,
                default: false
            },
            interval: {// 自动保存间隔 mm
                type: Number,
                default: 10000
            },
            exportFileName: {// 默认导出文件名称
                type: String,
                default: 'unnamed'
            },
            markedOptions: {//marked.js配置项
                type: Object,
                default() {
                    return {};
                }
            },
            copyCode: {// 复制代码
                type: Boolean,
                default: true
            },
            copyBtnText: {// 复制代码按钮文字
                type: String,
                default: '复制代码'
            },
            isPreview: {//是否是预览模式
                type: Boolean,
                default: false
            }
        }
    };
</script>

<style scoped>

</style>
