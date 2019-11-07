<template>
    <div class="md-role-multiple-selector">
        <a-select mode="multiple" v-model="data">
            <a-select-option v-for="(r, i) in roles" :value="r.id" :key="i">{{r.displayName}}</a-select-option>
        </a-select>
    </div>
</template>

<script>
    import role from '@/common/apis/role';
    import MdMVVMObject from '@/components/mixins/MdMVVMObject';

    export default {
        name: 'RoleMultipleSelector',
        mixins: [MdMVVMObject],
        data() {
            return {
                roles: []
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData(name) {
                role.list({params: {name}}).then(res => {
                    this.$utils.responseHandler(res, false).then(({data}) => {
                        if (data) {
                            this.roles = data;
                        } else {
                            this.roles = [];
                        }
                    });
                });
            }
        }
    };
</script>

<style scoped>
    .md-role-multiple-selector {

    }
</style>
