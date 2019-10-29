import Welcome from '@/views/backstage/Welcome';

export default [
    {
        name: 'Backstage',
        path: '/backstage',
        components: Welcome,
        children: [
            {
                name: 'Welcome',
                path: 'welcome',
                components: Welcome,
            }
        ]
    }
]
