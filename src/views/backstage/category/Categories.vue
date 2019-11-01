<template>
    <div class="md-categories">
        <a-spin :spinning="spinning">
            <md-form inline :model="query" :rules="queryRules" @submit="getData(true)" class="v-form" inline-error>
                <a-row>
                    <responsive-col>
                        <md-form-item label="分类名称" show-one-error prop="name">
                            <a-input v-model="query.name" placeholder="通过名称搜索" maxlength="32"/>
                        </md-form-item>
                    </responsive-col>
                    <responsive-col>
                        <md-form-item align="left">
                            <a-button type="primary" html-type="submit" icon="search">查询</a-button>
                            <a-button type="success" @click="status.drawer.create = true">创建</a-button>
                        </md-form-item>
                    </responsive-col>
                </a-row>
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
        <md-drawer :md-active.sync="status.drawer.create" width="400" title="创建分类">
            <a-spin :spinning="spinning2">
                <forums-category-form v-model="form" @submit="onCreateSubmit"></forums-category-form>
            </a-spin>
        </md-drawer>
    </div>
</template>

<script>
    import MdForm from '@/components/widget/form/MdForm';
    import MdFormItem from '@/components/widget/form/MdFormItem';
    import category from '@/common/apis/category';
    import FormatDatetime from '@/components/widget/FormatDatetime';
    import ResponsiveCol from '@/components/widget/ResponsiveCol';
    import MdDrawer from '@/components/widget/MdDrawer';
    import ForumsCategoryForm from '@/components/form/ForumsCategoryForm';

    export default {
        components: {ForumsCategoryForm, MdDrawer, ResponsiveCol, FormatDatetime, MdFormItem, MdForm},
        data() {
            return {
                spinning: true,
                spinning2: false,
                query: {
                    name: undefined,
                    page: 1,
                    size: 20
                },
                queryRules: {
                    name: ['between:1,32', 'string']
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
                    this.$utils.genTabColumn('操作', 'operation', 100, 'operation', 'center', 'action', 'right')
                ],
                pageCount: 0,
                status: {
                    drawer: {
                        create: false
                    }
                },
                form: {
                }
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
            },
            onCreateSubmit() {
                this.spinning2 = true;
                let data = Object.assign({}, this.form);
                data.icon = process.env.VUE_APP_STATIC_RESOURCE_URL + data.icon;
                data.banner = process.env.VUE_APP_STATIC_RESOURCE_URL + data.banner;
                category.created(data).then(res => {
                    this.$utils.responseHandler(res, true).then(() => {
                        this.status.drawer.create = false;
                        this.form = {};
                        this.getData(true);
                    });
                }).finally(() => this.spinning2 = false);
            }
        }
    };
</script>

<style scoped lang="scss">
    .md-categories {
        padding: 5px 10px;
        background-color: white;

        .md-form {
            .md-responsive-col {
                padding-right: 10px;;
            }

            .md-form-item {
                width: 100%;
            }
        }
    }
</style>
