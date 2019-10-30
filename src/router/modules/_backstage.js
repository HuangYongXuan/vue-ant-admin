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
            }
        ]
    }
];
