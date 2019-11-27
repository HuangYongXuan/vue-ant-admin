<template>
    <md-form @submit="onSubmit" :model="data" :rules="rules">
        <md-form-item label="邮箱" prop="email">
            <a-input v-model="data.email" placeholder="请输入电子邮箱地址" size="large"/>
        </md-form-item>
        <md-form-item label="密码" prop="password">
            <a-input type="password" v-model="data.password" placeholder="请输入密码" size="large"/>
        </md-form-item>
        <md-form-item>
            <a-checkbox @change.stop="() => {}">记住登陆</a-checkbox>
        </md-form-item>
        <a-button type="primary" html-type="submit" block size="large">登陆</a-button>
    </md-form>
</template>

<script>
    import MdForm from '@/components/widget/form/MdForm';
    import MdMVVMObject from '@/components/mixins/MdMVVMObject';
    import MdFormItem from '@/components/widget/form/MdFormItem';
    export default {
        name: 'UserLoginForm',
        components: {MdFormItem, MdForm},
        mixins: [MdMVVMObject],
        data () {
            return {
                rules: {
                    email: ['required', 'email'],
                    password: ['required', 'string', 'min:6', 'max:32']
                }
            }
        }
    };
</script>

<style scoped>

</style>
