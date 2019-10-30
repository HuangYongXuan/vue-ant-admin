<template>
    <div class="md-categories">
        <a-spin :spinning="spinning">
            <md-form inline :model="query" :rules="queryRules" @submit="getData(true)" class="v-form">
                <md-form-item label="分类名称" show-one-error prop="name">
                    <a-input v-model="query.name" placeholder="通过名称搜索" maxlength="32"/>
                </md-form-item>
                <md-form-item>
                    <a-button type="primary" html-type="submit">查询</a-button>
                </md-form-item>
            </md-form>

            <a-table :columns="columns" :dataSource="data" :scroll="{ x: 1300 }" row-key="id" :pagination="false">
                <a-switch slot="isEnabled" slot-scope="text" :checked="text" disabled/>
                <a-switch slot="isRoleAccess" slot-scope="text" :checked="text" disabled/>
                <a slot="action" slot-scope="text">action</a>
                <a-avatar slot="icon" slot-scope="text" :src="text" :size="10"></a-avatar>
                <img :src="text" slot="banner" slot-scope="text" alt="" height="10px">
                <format-datetime slot="createdAt" slot-scope="text" :datetime="text"/>
            </a-table>
            <div class="md-pagination">
                <a-pagination
                        showSizeChanger
                        :pageSize.sync="query.size"
                        @showSizeChange="getData()"
                        :total="pageCount"
                        v-model="query.page"
                />
            </div>
        </a-spin>
    </div>
</template>

<script>
    import MdForm from '@/components/widget/form/MdForm';
    import MdFormItem from '@/components/widget/form/MdFormItem';
    import category from '@/common/apis/category';
    import FormatDatetime from '@/components/widget/FormatDatetime';

    export default {
        name: 'Categories',
        components: {FormatDatetime, MdFormItem, MdForm},
        data() {
            return {
                spinning: true,
                query: {
                    name: undefined,
                    page: 1,
                    size: 20
                },
                queryRules: {
                    name: ['nullable', 'between:1,32', 'string']
                },
                data: [],
                columns: [
                    this.$utils.genTabColumn('ID', 'id', 100),
                    this.$utils.genTabColumn('分类名称', 'name', 200),
                    this.$utils.genTabColumn('图标', 'icon', 80),
                    this.$utils.genTabColumn('大图', 'banner', 80),
                    this.$utils.genTabColumn('描述', 'description'),
                    this.$utils.genTabColumn('是否启用', 'isEnabled'),
                    this.$utils.genTabColumn('角色控制', 'isRoleAccess'),
                    this.$utils.genTabColumn('排序', 'sortId', 100),
                    this.$utils.genTabColumn('创建时间', 'createdAt'),
                    this.$utils.genTabColumn('操作', 'operation', 100, 'operation','center', 'action', 'right')
                ],
                pageCount: 0
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData(b) {
                if (b === true) this.query.page = 1;
                this.spinning = true;
                category.list({params: this.query}).then(res => {
                    this.$utils.responseHandler(res).then(({data}) => {
                        this.data = data.rows;
                        this.pageCount = data.count;
                    });
                }).finally(() => this.spinning = false);
            }
        }
    };
</script>

<style scoped lang="scss">
    .md-categories {
        padding: 5px 10px;
        background-color: white;

        .md-form {

            .md-form-item {
                width: auto;
                max-width: 100%;
            }
        }
    }
</style>
