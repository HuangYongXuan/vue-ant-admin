<template>
    <md-form :model="data" :rules="rules" @submit="onSubmit">
        <md-form-item label="邮箱" prop="email">
            <a-input v-model="data.email" placeholder="请输入电子邮箱" type="email" :autocomplete="false" size="large"/>
        </md-form-item>
        <a-button block html-type="submit" type="primary" size="large">发送重置密码邮件</a-button>
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
                    email: ['required', 'email'],
                }
            };
        }
    };
</script>

<style scoped>

</style>
