<template>
    <div class="md-form-item" :class="{'is-error': hasError,'md-form-inline': mdForm.inline}"
         @change="onChange" @input="onInput" :style="{textAlign: align}">
        <label v-if="label" class="md-form-label"
               :style="{flex: '0 0 '+ mdForm.labelWidth}"
               :class="{'md-required': isRequired}">{{label}}</label>
        <div class="md-form-input">
            <slot/>
        </div>
        <div class="md-errors">
            <div class="md-form-label"
                 :style="{flex: '0 0 '+ mdForm.labelWidth}">
            </div>
            <div class="md-form-error" :class="mdForm.inlineError === true ? 'md-form-error-inline' : ''">
                <transition-group tag="ul" name="slide-fade" mode="out-in">
                    <li v-for="(e,i) in errorMsg" :key="e"
                        v-if="errorMsg && errorMsg.length > 0 && ((showOneError && i===0) || !showOneError)">{{e}}
                    </li>
                </transition-group>
                <transition name="slide-fade" mode="out-in">
                    <p class="md-help-msg" v-if="errorMsg && errorMsg.length <= 0 && helpMsg">{{helpMsg}}</p>
                </transition>
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
            helpMsg: String,
            align: String,
            errorCustomMessages: Object,
            fieldName: Object,
            error: {
                type: Array,
                default: () => []
            }
        },
        inject: ['mdForm'],
        data() {
            return {
                errorMsg: this.error
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
                if (!this.prop) {
                    return true;
                }
                let data = {
                    name: this.mdForm.model[this.prop]
                };
                let rule = {
                    name: this.mdForm.rules[this.prop]
                };

                if (rule.name && rule.name.indexOf('confirmed') !== -1) {
                    data.name_confirmation = this.mdForm.model[this.prop + '_confirmation']
                }

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
        },
        watch: {
            error(e) {
                this.errorMsg = e;
            }
        }
    };
</script>

<style scoped lang="scss">
    .md-form-item {
        width: 100%;
        margin-top: 10px;
        padding-right: 10px;

        .md-form-label {
            margin-right: 10px;
            vertical-align: middle;
            display: inline-flex;
            min-height: 30px;
            line-height: 100%;
            align-items: center;

            &.md-required {
                /*color: #ff3949;*/
                &:before {
                    content: '*';
                    display: inline;
                    width: 10px;
                    color: #ff3949;
                }
            }
        }

        .md-form-input {
            flex: 1;
        }

        .md-form-error {
            color: #ff3949;
            min-height: 22px;
            position: relative;
            text-align: right;
            flex: 1;

            ul {
                margin: 0;
                font-size: 10px;
                list-style: none;
                padding: 0;
                line-height: 22px;
            }
        }

        .md-help-msg {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            text-align: right;
            font-size: 10px;
            line-height: 22px;
            color: #777;
            margin: 0;
            padding: 0;
        }
    }

    .md-errors {
        flex: 0 0 100%;
        display: flex;
    }

    .md-form-inline {
        display: inline-flex;
        flex-wrap: wrap;
        padding-right: 10px;
        width: auto;

        &:last-child {
            padding-right: 0;
        }

        .md-form-input {
            position: relative;
            display: flex;
            align-items: center;

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

