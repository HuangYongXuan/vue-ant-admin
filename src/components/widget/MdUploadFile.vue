<template>
    <a-spin :spinning="loading" tip="上传中">
        <div class="md-upload-file" :style="{height, width}" @click="selectFile" ref="f">
            <img :src="data | imageSrc" alt="" :width="width" :height="height" v-if="data">
            <div v-else class="md-action">
                <a-icon :type="loading ? 'loading' : 'plus'"/>
                <div class="ant-upload-text">上传图片</div>
            </div>
            <input type="file" hidden @change.stop="onFileChange" @input.stop="h" ref="file" :accept="accept">
        </div>
    </a-spin>
</template>

<script>
    import MdMVVMObject from '@/components/mixins/MdMVVMObject';
    import fileSystem from '@/common/apis/fileSystem';

    export default {
        name: 'MdUploadFile',
        mixins: [MdMVVMObject],
        props: {
            accept: {
                type: String,
                default: 'image/jpeg,image/png,image/gif,image/jpg'
            },
            disabled: Boolean,
            value: String,
            width: {
                type: String,
                default: '100px'
            },
            height: {
                type: String,
                default: '100px'
            }
        },
        data() {
            return {
                loading: false,
                spinning: true
            };
        },
        methods: {
            h(e) {
                console.info(e);
            },
            selectFile() {
                if (this.loading) return;
                this.$refs.file.click();
            },
            onFileChange(e) {
                if (!e.target.files || e.target.files.length <= 0) return;
                let file = e.target.files[0];
                let formData = new FormData();
                formData.append('file', file);
                this.loading = true;
                fileSystem.upload(formData).then(res => {
                    this.$utils.responseHandler(res, true, true, '上传成功').then(({data}) => {
                        this.data = data.savePath;
                        this.bubble();
                    });
                }).finally(() => {
                    this.loading = false;
                    this.$refs.file.value = '';
                });
            },

            bubble: function () {
                let $parent = this.$parent;
                while ($parent) {
                    if ($parent && $parent && $parent.$options.componentName === 'MdFormItem') {
                        setTimeout(() => {
                            $parent.validator();
                        }, 0);
                        break;
                    }
                    $parent = $parent.$parent;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .md-upload-file {
        overflow: hidden;
        text-align: center;
        vertical-align: top;
        background-color: #fafafa;
        border: 1px dashed #d9d9d9;
        border-radius: 4px;
        cursor: pointer;
        transition: border-color 0.3s ease;

        .md-action {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            > i {
                font-size: 20px;
                line-height: 30px;
            }
        }
    }
</style>
