<template>
    <md-form :model="data" :rules="rules" inline label-width="80px" @submit="onSubmit">
        <md-form-item label="邮箱" prop="email">
            <a-input v-model="data.email" placeholder="请输入电子邮箱" type="email" :autocomplete="false"/>
        </md-form-item>
        <md-form-item label="用户昵称" prop="username">
            <a-input v-model="data.username" autocomplete="off" placeholder="请输入昵称"/>
        </md-form-item>
        <md-form-item label="密码" prop="password_confirmation">
            <a-input v-model="data.password_confirmation" type="password" autocomplete="new-password" placeholder="请输入密码"/>
        </md-form-item>
        <md-form-item label="确认密码" prop="password">
            <a-input v-model="data.password" type="password" :autocomplete="false" placeholder="请确认密码"/>
        </md-form-item>
        <md-form-item label=" ">
            <a-button type="primary" html-type="submit">提交</a-button>
        </md-form-item>
    </md-form>
</template>

<script>
    import MdMVVMObject from '@/components/mixins/MdMVVMObject';
    import MdForm from '@/components/widget/form/MdForm';
    import MdFormItem from '@/components/widget/form/MdFormItem';

    export default {
        name: 'UserRegisterForm',
        components: {MdFormItem, MdForm},
        mixins: [MdMVVMObject],
        data() {
            return {
                rules: {
                    email: ['required', 'email'],
                    username: ['required', 'string', 'max:32'],
                    password: ['required', 'string', 'max:32', 'min:6', 'confirmed'],
                    password_confirmation: ['required', 'string', 'max:32', 'min:6']
                }
            };
        }
    };
</script>

<style scoped lang="scss">
    .md-form-item {
        width: 100%;
    }
</style>
