<template>
    <div class="md-form-item" :class="{'is-error': hasError,'md-form-inline': mdForm.inline}"
         @change="onChange" @input="onInput" :style="{textAlign: align}">
        <label v-if="label" class="md-form-label"
               :style="{flex: '0 0 '+ mdForm.labelWidth}"
               :class="{'md-required': isRequired}">{{label}}</label>
        <div class="md-form-input">
            <slot/>
            <div class="md-form-error" :class="mdForm.inlineError === true ? 'md-form-error-inline' : ''">
                <transition-group name="list" tag="ul">
                    <li v-for="(e,i) in errorMsg" :key="e" v-if="(showOneError && i===0) || !showOneError">{{e}}</li>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
    import validator from 'el-form-validator';
    import {generateUuid} from '@/common/Utils';

    export default {
        name: 'MdFormItem',
        componentName: 'MdFormItem',
        props: {
            prop: String,
            label: String,
            showOneError: Boolean,
            id: {
                type: String,
                default: () => generateUuid('v-f-i-')
            },
            align: String,
            errorCustomMessages: Object,
            fieldName: Object
        },
        inject: ['mdForm'],
        data() {
            return {
                errorMsg: []
            };
        },
        computed: {
            isRequired() {
                if (!this.prop || !this.mdForm.rules) return false;
                let rules = this.mdForm.rules[this.prop];
                return rules.indexOf('required') !== -1;
            },
            hasError() {
                return this.errorMsg && this.errorMsg.length > 0;
            }
        },
        mounted() {
            if (!this.prop) return;
            this.$bus.emit('md-form-add-field' + this.mdForm.id, this);
            this.addEvent();
        },
        beforeDestroy() {
            this.$bus.emit('md-form-remove-field' + this.mdForm.id, this);
        },
        methods: {
            async validator() {
                let data = {
                    name: this.mdForm.model[this.prop]
                };
                let rule = {
                    name: this.mdForm.rules[this.prop]
                };
                let v = validator.make(data, rule, this.errorCustomMessages, this.fieldName);
                let fails = await v.fails();
                if (fails) {
                    this.errorMsg = v.getErrors()['name'];
                } else {
                    this.errorMsg = [];
                }
                return !fails;
            },
            addEvent() {

            },
            onChange() {
                this.validator();
            },
            onInput() {
                this.validator();
            }
        }
    };
</script>

<style scoped lang="scss">
    .md-form-item {
        display: inline-flex;
        width: 100%;
        margin-top: 10px;
        padding-right: 10px;

        .md-form-label {
            line-height: 30px;
            margin-right: 10px;
            position: relative;
            padding-left: 10px;

            &.md-required {
                /*color: #ff3949;*/
                &:before {
                    content: '*';
                    position: absolute;
                    left: 0;
                    top: 0;
                    color: #ff3949;
                    line-height: 30px;
                }
            }
        }

        .md-form-input {
            flex: 1;
        }

        .md-form-error {
            color: #ff3949;
            min-height: 22px;

            ul {
                margin: 0;
                font-size: 10px;
                list-style: none;
                padding: 0;
                line-height: 22px;
            }
        }
    }

    .md-form-inline {
        padding-right: 10px;
        width: auto;

        &:last-child {
            padding-right: 0;
        }

        .md-form-input {
            position: relative;

            > .ant-btn {
                margin-right: 10px;

                &:last-child {
                    margin-right: 0;
                }
            }

            .md-form-error-inline {
                top: -12px;
                right: 5px;
                position: absolute;
                background-color: white;
            }
        }
    }
</style>

