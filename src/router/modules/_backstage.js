const BaseRouterView = () => import('@/components/widget/BaseRouterView.vue');
const MainLayout = () => import ('@/components/layout/backstage/MainLayout');
const Welcome = () => import( '@/views/backstage/Welcome');

export default [
    {
        name: 'Backstage',
        path: '/backstage',
        component: MainLayout,
        children: [
            {
                name: 'Welcome',
                path: 'welcome',
                component: Welcome
            },
            {
                name: 'User',
                path: 'user',
                component: BaseRouterView,
                children: [
                    {
                        name: 'Profile',
                        path: 'profile',
                        component: () => import('@/views/backstage/option/Profile.vue')
                    },
                    {
                        name: 'Notification',
                        path: 'notification',
                        component: () => import('@/views/backstage/option/Notification.vue')
                    }
                ]
            },
            {
                name: 'Setting',
                path: 'setting',
                component: () => import('@/views/backstage/option/Setting.vue')
            },
            {
                name: 'Category',
                path: 'category',
                component: BaseRouterView,
                children:[
                    {
                        name: 'Classes',
                        path: 'classes',
                        component: () => import("@/views/backstage/category/Classes.vue")
                    },
                    {
                        name: 'Categories',
                        path: 'categories',
                        component: () => import("@/views/backstage/category/Categories.vue")
                    },
                    {
                        name: 'Types',
                        path: "types",
                        component: () => import("@/views/backstage/category/Types.vue")
                    }
                ]
            }
        ]
    }
];
