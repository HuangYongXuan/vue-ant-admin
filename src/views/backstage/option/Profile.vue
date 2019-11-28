<template>
    <div class="md-container">
        <a-row :gutter="8">
            <a-col :xs="24" :sm="24" :md="11" :lg="9" :xl="9" :xxl="6">
                <md-panel>
                    <div slot="title" class="md-user-profile-panel-title">
                        <span>用户详情</span>
                        <a-button icon="edit" size="small" v-if="!id" @click="showEditDrawer"/>
                    </div>
                    <a-avatar :src="user.avatar | imageSrc" :size="78" style="display: block; margin: 0 auto"/>
                    <a-divider/>
                    <a-list>
                        <a-list-item>
                            <a-list-item-meta title="id"/>
                            <span>{{user.id}}</span>
                        </a-list-item>
                        <a-list-item>
                            <a-list-item-meta title="角色"/>
                            <span>
                                <a-tag v-for="(r, i) in user.roles" :key="i">{{r.displayName}}</a-tag>
                            </span>
                        </a-list-item>
                        <a-list-item>
                            <a-list-item-meta title="用户名"/>
                            <span>{{user.username}}</span>
                        </a-list-item>
                        <a-list-item>
                            <a-list-item-meta title="邮箱"/>
                            <a :href="'mailto:'+user.email">{{user.email}}</a>
                        </a-list-item>
                        <a-list-item>
                            <a-list-item-meta title="加入时间"/>
                            <span>{{user.createdAt | formatterTimestamp}}</span>
                        </a-list-item>
                        <a-list-item>
                            <a-list-item-meta title="上次登在线时间"/>
                            <span>{{user.updatedAt | formatterTimestamp}}</span>
                        </a-list-item>
                    </a-list>
                </md-panel>
            </a-col>
            <a-col :xs="24" :sm="24" :md="13" :lg="15" :xxl="18">
                <md-panel title="帖子">
                    <a-empty/>
                </md-panel>
            </a-col>
        </a-row>

        <md-drawer title="修改信息" :width="_setting.formDrawerWidth" :md-active.sync="drawer">
            <a-spin :spinning="spinning">
                <user-profile-form v-model="form" @submit="onUpdateUser"/>
            </a-spin>
        </md-drawer>
    </div>
</template>

<script>
    import user from '@/common/apis/user';
    import MdPanel from '@/components/widget/panel/MdPanel';
    import MdDrawer from '@/components/widget/MdDrawer';
    import UserProfileForm from '@/components/form/UserProfileForm';

    export default {
        components: {UserProfileForm, MdDrawer, MdPanel},
        data() {
            return {
                id: undefined,
                user: {
                    roles: []
                },
                drawer: false,
                form: {},
                spinning: false
            };
        },
        created() {
            this.id = this.$route.query.id;
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                user.profile({users_id: this.id}).then(res => {
                    this.$utils.responseHandler(res).then(({data}) => {
                        this.user = data;
                    });
                });
            },
            showEditDrawer() {
                this.form = this.$utils.deepCopy(this.user);
                this.drawer = true;
            },
            onUpdateUser() {
                this.spinning = true;
                user.profileUpdate(this.form).then(res => {
                    this.$utils.responseHandler(res, true).then(() => {
                        this.getData();
                        this.drawer = false;
                    });
                }).finally(() => this.spinning = false);
            }
        }
    };
</script>

<style scoped lang="scss">
    .md-user-profile-panel-title {
        display: flex;

        > span {
            flex: 1;
        }
    }
</style>
