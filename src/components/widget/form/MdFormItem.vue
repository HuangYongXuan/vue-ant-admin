<template>
    <div class="md-form-item" :class="{
        'is-error': hasError,
        'md-form-inline': mdForm.inline
    }" @change="onChange" @input="onInput">
        <label v-if="label" class="md-form-label" :style="{width: mdForm.labelWidth}">
            <span v-if="isRequired" class="md-required">*</span>
            {{label}}
        </label>
        <div class="md-form-input">
            <slot/>
            <div class="md-form-error">
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
        props: {
            prop: String,
            label: String,
            showOneError: Boolean,
            id: {
                type: String,
                default: () => generateUuid('v-f-i-')
            },
            errorCustomMessages: Array,
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
                return Array.isArray(rules) && rules.indexOf('required') !== -1;
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
            validator() {
                let v = validator.make(this.mdForm.model, this.mdForm.rules, this.errorCustomMessages, this.fieldName);

                if (v.fails()) {
                    this.errorMsg = v.getErrors()[this.prop];
                    return false;
                }
                this.errorMsg = [];
                return true;
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
        margin-top: 10px;
        margin-bottom: 10px;

        .md-form-label {
            line-height: 30px;

            .md-required {
                color: #ff3949;
                padding-right: 5px;
            }
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
        display: flex;

        .md-form-input {
            flex: 1
        }
    }
</style>

