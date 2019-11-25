<template>
    <md-form :model="data" :rules="rules" @submit="onSubmit" :rel="formRef">
        <md-form-item label="邮箱" prop="email">
            <a-input v-model="data.email" placeholder="请输入邮箱地址" size="large"/>
        </md-form-item>
        <a-button block html-type="submit" type="primary" size="large">Send Reset Instructions</a-button>
    </md-form>
</template>

<script>
    import MdMVVMObject from '@/components/mixins/MdMVVMObject';
    import MdFormItem from '@/components/widget/form/MdFormItem';
    import MdForm from '@/components/widget/form/MdForm';

    export default {
        name: 'UserForgotPasswordForm',
        components: {MdForm, MdFormItem},
        mixins: [MdMVVMObject],
        data() {
            return {
                rules: {
                    email: 'required|email'
                }
            };
        }
    };
</script>

<style scoped>

</style>
