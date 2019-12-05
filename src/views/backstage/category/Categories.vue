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
            <a-table :dataSource="data" :scroll="{ x: 1300 }" row-key="id" :pagination="false"
                     :size="_setting.tableSize" bordered>
                <a-table-column title="ID" data-index="id" align="left" :width="100"/>
                <a-table-column title="分类名称" data-index="name" align="center"/>
                <a-table-column title="用户名" data-index="username" align="center">
                    <template slot-scope="username, record">
                        <router-link v-if="username" :to="{name: 'Profile', query: {id: record.moderatorId}}">
                            {{username}}
                        </router-link>
                    </template>
                </a-table-column>
                <a-table-column title="图标" data-index="icon" align="center" key="icon" :width="50">
                    <a-avatar slot-scope="icon" :src="icon | imageSrc" :size="10" @click="onShowImagePreview(icon)"/>
                </a-table-column>
                <a-table-column title="大图" data-index="banner" align="center" key="banner" :width="50">
                    <img slot-scope="banner" :src="banner | imageSrc" alt="" height="10px" @click="onShowImagePreview(banner)">
                </a-table-column>
                <a-table-column title="是否启用" data-index="isEnabled" align="center" key="isEnabled" :width="80">
                    <a-switch slot-scope="isEnabled" :checked="isEnabled" disabled/>
                </a-table-column>
                <a-table-column title="角色控制" data-index="isRoleAccess" align="center" key="isRoleAccess" :width="80">
                    <a-switch slot-scope="isRoleAccess" :checked="isRoleAccess" disabled/>
                </a-table-column>
                <a-table-column title="排序" data-index="sortId" align="center" :width="50"/>
                <a-table-column title="创建时间" data-index="createdAt" align="center" key="createdAt" :width="100">
                    <format-datetime slot-scope="createdAt" :datetime="createdAt"/>
                </a-table-column>
                <a-table-column title="操作" align="right" key="action" :width="200">
                    <template slot-scope="text, record">
                        <a-button icon="edit" type="primary" :size="_setting.tableActionBtnSize"
                                  @click="onEditCategory(record)">
                            <span v-if="_setting.tableShowActionBtnText">编辑</span>
                        </a-button>
                        <a-button icon="delete" type="danger" :size="_setting.tableActionBtnSize"
                                  @click="deleteCategory(record)">
                            <span v-if="_setting.tableShowActionBtnText">删除</span>
                        </a-button>
                    </template>
                </a-table-column>
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
        <md-drawer :md-active.sync="status.drawer.create" :width="_setting.formDrawerWidth" title="创建分类">
            <a-spin :spinning="spinning2">
                <forums-category-form v-model="form" @submit="onCreateSubmit"/>
            </a-spin>
        </md-drawer>
        <md-drawer :md-active.sync="status.drawer.edit" :width="_setting.formDrawerWidth"
                   :title="'编辑['+status.data.old.name+']分类'">
            <a-spin :spinning="spinning2">
                <forums-category-form v-model="status.data.edit" @submit="onEditSubmit"/>
            </a-spin>
        </md-drawer>
        <md-image-preview :md-active.sync="showPreview" :src="src | imageSrc"/>
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
    import MdImagePreview from '@/components/widget/MdImagePreview';

    export default {
        components: {MdImagePreview, ForumsCategoryForm, MdDrawer, ResponsiveCol, FormatDatetime, MdFormItem, MdForm},
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
                    name: ['between:1,32', 'string', 'nullable']
                },
                data: [],
                pageCount: 0,
                status: {
                    drawer: {
                        create: false,
                        edit: false
                    },
                    data: {
                        edit: {},
                        old: {}
                    }
                },
                form: {},
                showPreview: false,
                src: undefined
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
                category.created(data).then(res => {
                    this.$utils.responseHandler(res, true).then(() => {
                        this.status.drawer.create = false;
                        this.form = {};
                        this.getData(true);
                    });
                }).finally(() => this.spinning2 = false);
            },
            deleteCategory(record) {
                this.$utils.onConfirmDelete(`是否删除${record.name}?`, (resolve, reject) => {
                    category.deleted(record.id).then(res => {
                        this.$utils.responseHandler(res, true, true).then(() => {
                            resolve();
                            this.getData(true);
                        });
                    }).catch(() => resolve());
                });
            },
            onEditCategory(record) {
                this.status.data.edit = {};
                this.spinning2 = true;
                this.status.drawer.edit = true;
                category.get(record.id, {params: {roles: true}}).then(res => {
                    this.$utils.responseHandler(res, false).then(({data}) => {
                        if (data.roles) {
                            data.roles = data.roles.map(item => {
                                return item.rolesId;
                            });
                        } else {
                            data.roles = [];
                        }
                        this.status.data.old = data;
                        this.status.data.edit = Object.assign({}, data);
                    }).catch(() => this.status.drawer.edit = false);
                }).catch(() => this.status.drawer.edit = false).finally(() => {
                    this.spinning2 = false;
                });
            },
            onEditSubmit() {
                this.spinning2 = true;
                category.update(this.status.data.old.id, this.status.data.edit).then(res => {
                    this.$utils.responseHandler(res, true, true).then(() => {
                        this.getData();
                        this.status.drawer.edit = false;
                    });
                }).finally(() => this.spinning2 = false);
            },
            onShowImagePreview(src) {
                this.src = src;
                this.showPreview = true;
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
