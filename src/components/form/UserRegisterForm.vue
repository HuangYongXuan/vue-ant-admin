<template>
    <md-form :model="data" :rules="rules">
        <md-form-item label="邮箱" prop="email">
            <a-input v-model="data.email"/>
        </md-form-item>
        <md-form-item>
            <a-button type="primary" html-type="submit">提交</a-button>
        </md-form-item>
    </md-form>
</template>

<script>
    import MdMVVMObject from '@/components/mixins/MdMVVMObject';
    import MdForm from '@/components/form/MdForm';
    import MdFormItem from '@/components/form/MdFormItem';
    import validator from 'el-form-validator';

    export default {
        name: 'UserRegisterForm',
        components: {MdFormItem, MdForm},
        mixins: [MdMVVMObject],
        data() {
            return {
                rules: {
                    email: [
                        {
                            required: true,
                            validator: validator.verification,
                            rules: ['required', 'email']
                        }
                    ]
                }
            };
        }
    };
</script>

<style scoped>

</style>
