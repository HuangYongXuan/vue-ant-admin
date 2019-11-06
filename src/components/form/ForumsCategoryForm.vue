<template>
    <md-form :model="data" :rules="rules" class="v-form" @submit="onSubmit" label-width="80px">
        <md-form-item label="上传图标" prop="icon">
            <md-upload-file v-model="data.icon" width="100px" height="100px"/>
        </md-form-item>
        <md-form-item label="上传大图" prop="banner">
            <md-upload-file v-model="data.banner" width="auto" height="100px" style="min-width: 150px"/>
        </md-form-item>
        <md-form-item label="分类名称" prop="name">
            <a-input v-model="data.name" class="md-block"/>
        </md-form-item>
        <md-form-item label="是否启用" prop="isEnabled">
            <a-switch v-model="data.isEnabled"/>
        </md-form-item>
        <md-form-item label="是否限制" prop="isRoleAccess">
            <a-switch v-model="data.isRoleAccess"/>
            <span> 只有选择的角色才能访问</span>
        </md-form-item>
        <md-form-item label="选择角色" prop="roles" v-if="data.isRoleAccess">
            <role-multiple-selector v-model="data.roles"/>
        </md-form-item>
        <md-form-item label="超级版主" prop="moderatorId" :error-custom-messages="moderatorIdErrorMsg" show-one-error>
            <user-selector v-model="data.moderatorId" :def-value="defaultUserValue"/>
        </md-form-item>
        <md-form-item label="排序" prop="sortId">
            <a-input-number v-model="data.sortId"/> 数字越大越靠前
        </md-form-item>
        <md-form-item label="描述" prop="description">
            <a-input v-model="data.description" type="textarea" class="md-block"/>
        </md-form-item>
        <md-form-item>
            <slot>
                <a-button type="primary" html-type="submit" block>提交</a-button>
            </slot>
        </md-form-item>
    </md-form>
</template>

<script>
    import MdForm from '@/components/widget/form/MdForm';
    import MdMVVMObject from '@/components/mixins/MdMVVMObject';
    import MdFormItem from '@/components/widget/form/MdFormItem';
    import MdUploadFile from '@/components/widget/MdUploadFile';
    import RoleMultipleSelector from '@/components/selector/RoleMultipleSelector';
    import UserSelector from '@/components/selector/UserSelector';

    export default {
        name: 'ForumsCategoryForm',
        components: {UserSelector, RoleMultipleSelector, MdUploadFile, MdFormItem, MdForm},
        mixins: [MdMVVMObject],
        data() {
            return {
                rules: {
                    icon: ['required', 'string', 'max:255'],
                    banner: ['required', 'string', 'max:255'],
                    name: 'required|max:64',
                    description: 'string|nullable',
                    moderatorId: 'required|integer|min:0',
                    isEnabled: 'required|nullable|boolean',
                    isRoleAccess: 'required|nullable|boolean',
                    sortId: 'nullable|integer',
                    roles: 'required|array|min:1'
                },
                moderatorIdErrorMsg: {
                    required: "请选择用户",
                    integer: '请选择用户',
                    min: '请选择用户'
                },
                defaultUserValue: {
                    id: '',
                    label: ''
                }
            };
        },
        mounted() {
            this.setDefaultUserValue()
        },
        methods: {
            watchData () {
                this.setDefaultUserValue();
            },
            setDefaultUserValue () {
                this.defaultUserValue = {
                    id: this.data.id,
                    label: this.data.username
                }
            }
        }
    };
</script>

<style scoped>
    .md-block {
        display: block;
        width: 100%;
    }
</style>
