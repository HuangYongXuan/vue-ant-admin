<template>
    <div class="md-container">
        <md-form inline label-width="140px">
            <a-row>
                <a-col :span="24">
                    <md-form-item label="设置主题" class="md-block">
                        <a-radio-group :defaultValue="_theme" buttonStyle="solid" @change="onThemeChange">
                            <a-radio-button value="light">亮色</a-radio-button>
                            <a-radio-button value="dark">暗色</a-radio-button>
                        </a-radio-group>
                    </md-form-item>
                </a-col>
                <a-col :span="24">
                    <md-form-item label="表单抽屉宽度" class="md-block">
                        <a-slider :min="200" :max="1000" v-model="option.formDrawerWidth" class="md-block"/>
                    </md-form-item>
                </a-col>
                <a-col :span="24">
                    <md-form-item label="表格操作按钮大小" class="md-block">
                        <a-radio-group buttonStyle="solid" v-model="option.tableActionBtnSize">
                            <a-radio-button :value="undefined">默认</a-radio-button>
                            <a-radio-button value="small">小</a-radio-button>
                            <a-radio-button value="large">大</a-radio-button>
                        </a-radio-group>
                    </md-form-item>
                </a-col>
                <a-col :span="24">
                    <md-form-item label="表格大小" class="md-block">
                        <a-radio-group buttonStyle="solid" v-model="option.tableSize">
                            <a-radio-button :value="undefined">默认</a-radio-button>
                            <a-radio-button value="small">小</a-radio-button>
                            <a-radio-button value="large">大</a-radio-button>
                        </a-radio-group>
                    </md-form-item>
                </a-col>
                <a-col :span="24">
                    <md-form-item label="是否线程操作按钮文字" class="md-block">
                        <a-switch v-model="option.tableShowActionBtnText">显示</a-switch>
                    </md-form-item>
                </a-col>
            </a-row>
        </md-form>
    </div>
</template>

<script>
    import ResponsiveCol from '@/components/widget/ResponsiveCol';
    import MdFormItem from '@/components/widget/form/MdFormItem';
    import MdForm from '@/components/widget/form/MdForm';
    import {mapGetters} from 'vuex';
    import Debounce from '@/common/class/Debounce';

    export default {
        components: {MdForm, MdFormItem, ResponsiveCol},
        data() {
            return {
                option: {},
                debounce: new Debounce()
            };
        },
        mounted() {
            this.option = this._setting;
        },
        methods: {
            onThemeChange({target}) {
                this.$store.commit('SET_THEME', target.value);
            }
        },
        watch: {
            _setting(n) {
                this.option = n;
            },
            async option () {
                await this.$nextTick();
                this.$store.commit('SET_SETTING', this.option)
            }
        }
    };
</script>

<style scoped lang="scss">
    .md-setting {
    }
</style>
