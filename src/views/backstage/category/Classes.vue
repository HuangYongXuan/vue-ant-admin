<template>
    <div class="md-container">
        <a-spin :spinning="spinning">
            <md-form inline :model="query" @submit="getData(true)" class="v-form" inline-error>
                <a-row :gutter="8">
                    <responsive-col>
                        <md-form-item label="分类名称" show-one-error>
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
            <a-table bordered :data-source="table.rows" :scroll="{ x: 1300 }" row-key="id" :pagination="false"
                     :size="_setting.tableSize">
                <a-table-column :width="100" align="left" data-index="id" title="ID"/>
                <a-table-column  align="center" data-index="name" title="名称"/>
                <a-table-column title="图标" data-index="icon" align="center" key="icon" :width="50">
                    <a-avatar slot-scope="icon" :src="icon" :size="10" @click="onShowImagePreview(icon)"/>
                </a-table-column>
                <a-table-column title="大图" data-index="banner" align="center" key="banner" :width="50">
                    <img slot-scope="banner" :src="banner" alt="" height="10px" @click="onShowImagePreview(banner)">
                </a-table-column>
                <a-table-column title="是否启用" data-index="isEnabled" align="center" key="isEnabled" :width="80">
                    <a-switch slot-scope="isEnabled" :checked="isEnabled" disabled/>
                </a-table-column>
                <a-table-column title="角色控制" data-index="isRoleAccess" align="center" key="isRoleAccess" :width="80">
                    <a-switch slot-scope="isRoleAccess" :checked="isRoleAccess" disabled/>
                </a-table-column>
                <a-table-column title="排序" data-index="sortId" align="center" :width="80"/>
                <a-table-column title="创建时间" data-index="createdAt" align="center" key="createdAt" :width="100">
                    <format-datetime slot-scope="createdAt" :datetime="createdAt"/>
                </a-table-column>

                <a-table-column title="操作" align="right" key="action" :width="170">
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
            <md-pagination :size.sync="query.size" :total="table.count" v-model="query.page" @change="getData()"/>
        </a-spin>

        <md-image-preview :md-active.sync="showPreview" :src="src"/>
    </div>
</template>
<script>

    import MdForm from '@/components/widget/form/MdForm';
    import ResponsiveCol from '@/components/widget/ResponsiveCol';
    import MdFormItem from '@/components/widget/form/MdFormItem';
    import Classes from '@/common/apis/classes';
    import MdTableMixin from '@/components/mixins/MdTableMixin';
    import MdPagination from '@/components/widget/MdPagination';
    import MdImagePreview from '@/components/widget/MdImagePreview';
    import FormatDatetime from '@/components/widget/FormatDatetime';

    export default {
        components: {FormatDatetime, MdImagePreview, MdPagination, MdFormItem, ResponsiveCol, MdForm},
        mixins: [MdTableMixin],
        data() {
            return {
                spinning: false,
                showPreview: false,
                src: '',
                query: {
                    name: undefined,
                    page: 1,
                    size: 15
                }
            };
        },
        created() {
            this.getData();
        },
        methods: {
            getData(b) {
                if (b === true) this.query.page = 1;
                this.spinning = true;
                Classes.list({params: this.query}).then(res => {
                    this.$utils.responseHandler(res).then(({data}) => {
                        this.table = data;
                    });
                }).finally(() => this.spinning = false);
            },
            onShowImagePreview(src) {
                this.src = src;
                this.showPreview = true;
            },
            onEditCategory(item) {

            },
            deleteCategory(item) {

            }
        }
    };
</script>
