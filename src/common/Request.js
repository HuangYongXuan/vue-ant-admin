import Axios from 'axios';
import store from '@/store';
import router from '@/router';
import {notification} from 'ant-design-vue';

export const Request = Axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : process.env.VUE_APP_API_BASE_URL
});

let errorMessage = (msg) => {
    notification.error({
        duration: 4.5,
        message: '出错啦',
        description: msg
    });
};

Request.interceptors.request.use(
    conf => {
        let token = store.state.User.token;
        if (token) {
            conf.headers['Authorization'] = 'Bearer ' + token;
        }
        return conf;
    },
    err => {
        return Promise.reject(err);
    }
);

Request.interceptors.response.use(
    response => {
        return response;
    },
    err => {
        let resp = err.response;
        if (!resp) {
            errorMessage(err.message);
            return Promise.reject(err);
        }
        switch (resp.status) {
            case 400:
                errorMessage('客户端请求的语法错误，服务器无法理解，犯人是:' + resp.config.url);
                break;
            case 404:
                errorMessage('请求资源不存在，犯人是：' + resp.config.url);
                break;
            case 405:
                errorMessage('客户端请求中的方法被禁止，犯人是：' + resp.config.url);
                break;
            case 401:
                errorMessage('请求要求用户的身份认证');
                store.dispatch('logout');
                router.replace({name: 'Login'});
                break;
            case 403:
                errorMessage('无权访问：403');
                break;
            case 500:
                errorMessage('服务器内部错误500，犯人是：' + resp.config.url);
                break;
            case 501:
                errorMessage('服务器不支持请求的功能，无法完成请求，犯人是：' + resp.config.url);
                break;
            case 502:
                errorMessage('网关错误：502');
                break;
            case 503:
                errorMessage('服务器超载或系统维护');
                break;
        }
        return Promise.reject(err);
    }
);

export default Request;
