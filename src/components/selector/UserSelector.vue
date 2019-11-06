<template>
    <div class="md-user-selector">
        <a-select v-model="v2" showSearch
                  :filterOption="false"
                  placeholder="选择用户"
                  :showArrow="false"
                  labelInValue
                  :notFoundContent="fetching ? undefined : null"
                  @change="handleChange"
                  @search="getData">

            <a-spin v-if="fetching" slot="notFoundContent" size="small"/>
            <a-select-option v-for="u in users" :key="u.id" :value="u.id">
                {{u.username}}
            </a-select-option>
        </a-select>
    </div>
</template>

<script>
    import MdMVVMObject from '@/components/mixins/MdMVVMObject';
    import userOp from '@/common/apis/userOp';

    export default {
        name: 'UserSelector',
        mixins: [MdMVVMObject],
        props: {
            value: String,
            defValue: {
                type: Object,
                default: () => {
                    return {id: '', label: ''};
                }
            }
        },
        data() {
            return {
                fetching: true,
                users: [],
                v2: this.defValue
            };
        },
        watch: {
            defValue (n) {
                this.v2 = n;
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData(name) {
                this.fetching = true;
                userOp.list({params: {name}}).then(res => {
                    this.$utils.responseHandler(res, false).then(({data}) => {
                        if (data.rows) {
                            this.users = data.rows;
                        } else {
                            this.users = [];
                        }
                    });
                }).finally(() => this.fetching = false);
            },
            handleChange({key}) {
                this.data = key;
            }
        },
    };
</script>

<style scoped>

</style>
