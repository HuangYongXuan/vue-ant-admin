<template>
    <md-form label-width="100px" inline :rules="rules" @submit="onSubmit" :model="data">
        <md-form-item label="头像" class="md-block" prop="avatar">
            <md-upload-file v-model="data.avatar"/>
        </md-form-item>
        <md-form-item label="用户名" class="md-block" prop="username">
            <a-input v-model="data.username"/>
        </md-form-item>
        <md-form-item label="邮箱" class="md-block" prop="email">
            <a-input v-model="data.email"/>
        </md-form-item>
        <md-form-item label="密码" prop="password" class="md-block">
            <a-input v-model="data.password" type="password" autocomplete="new-password"
                     placeholder="请输入密码"/>
        </md-form-item>
        <md-form-item label="确认密码" prop="password_confirmation" class="md-block">
            <a-input v-model="data.password_confirmation" type="password" :autocomplete="false" placeholder="请确认密码"/>
        </md-form-item>
        <a-button html-type="submit" type="primary" block>提交</a-button>
    </md-form>
</template>

<script>
    import MdForm from '@/components/widget/form/MdForm';
    import MdMVVMObject from '@/components/mixins/MdMVVMObject';
    import MdFormItem from '@/components/widget/form/MdFormItem';
    import MdUploadFile from '@/components/widget/MdUploadFile';

    export default {
        name: 'UserProfileForm',
        components: {MdUploadFile, MdFormItem, MdForm},
        mixins: [MdMVVMObject],
        data() {
            return {
                rules: {
                    avatar: ['required', 'string'],
                    email: ['required', 'email'],
                    username: ['required', 'string', 'max:32'],
                    password: ['nullable', 'string', 'max:32', 'min:6', 'confirmed'],
                    password_confirmation: ['nullable', 'string', 'max:32', 'min:6']
                }
            };
        }
    };
</script>

<style scoped>

</style>