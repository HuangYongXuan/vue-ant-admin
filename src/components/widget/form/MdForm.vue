<template>
    <form class="md-form" @submit.prevent.stop="onSubmit">
        <slot/>
    </form>
</template>

<script>

    import {generateUuid} from '@/common/Utils';

    export default {
        name: 'MdForm',
        provide() {
            return {
                mdForm: this
            };
        },
        props: {
            model: Object,
            id: {
                type: String,
                default: () => generateUuid('-v-')
            },
            rules: {
                type: Object,
                default: () => {
                }
            },
            inline: Boolean,
            labelWidth: String,
            inlineError: Boolean
        },
        data() {
            return {
                fields: []
            };
        },
        methods: {
            onSubmit(e) {
                this.validator().then(() => {
                    this.$emit('submit');
                }).catch(() => {
                    this.$message.warning('表单数据验证失败')
                });
            },
            validator() {
                return new Promise(((resolve, reject) => {
                    let isSuccess = true;
                    this.fields.forEach(field => {
                        if (field.validator()) {
                            isSuccess = false;
                        }
                    });

                    if (isSuccess) {
                        return reject();
                    } else {
                        return resolve();
                    }
                }));
            }
        },
        created() {
            this.$bus.on('md-form-add-field' + this.id, (field) => {
                if (field) {
                    this.fields.push(field);
                }
            });
            this.$bus.on('md-form-remove-field' + this.id, (field) => {
                if (field.prop) {
                    this.fields.splice(this.fields.indexOf(field), 1);
                }
            });
        }
    };
</script>

<style scoped>

</style>
