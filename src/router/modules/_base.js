import util from '@/common/Utils';

const Index = () => import('@/views/Index');
const Login = () => import('@/views/authorization/Login');
const Register = () => import('@/views/authorization/Register');
const Error404 = () => import('@/views/error/404');
const ForgotPassword = () => import('@/views/authorization/ForgotPassword');

export default [
    {path: '/', name: 'Base', component: Index, ...util.routeMeta('Index', true, false, ['*'])},
    {path: '/index', name: 'Index', component: Index, ...util.routeMeta('Index', true, false, ['*'])},
    {path: '/authorization/login', name: 'Login', component: Login, ...util.routeMeta('Login', true, false, ['*'])},
    {
        path: '/authorization/register',
        name: 'Register',
        component: Register, ...util.routeMeta('Register', true, false, ['*'])
    }, {
        path: '/authorization//forgot/password',
        name: 'ForgotPassword',
        component: ForgotPassword, ...util.routeMeta('ForgotPassword', true, false, ['*'])
    },
    {path: '/error/404', name: 'Error404', component: Error404, ...util.routeMeta('Error404', true, false, ['*'])},
    {path: '*', redirect: {name: 'Error404'}, ...util.routeMeta('*', true, false, ['*'])}
];
