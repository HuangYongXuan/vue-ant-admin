import Request from '@/common/Request';

let baseUri = '/api/user/';

/**
 * 创建用户
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
export const create = (data) => {
    return Request.post(`${baseUri}create`, data);
};

/**
 * 用户授权
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
export const auth = (data) => {
    return Request.post(`${baseUri}auth`, data);
};

/**
 * 销毁用户的登陆状态
 * @returns {Promise<AxiosResponse<T>>}
 */
export const destroy = () => {
    return Request.delete(`${baseUri}auth/destroy`);
};

/**
 * 获取授权用户详情
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export const profile = (params) => {
    return Request.get(`${baseUri}profile`, {params});
};

/**
 * 刷新token
 * @returns {Promise<AxiosResponse<T>>}
 */
export const tokenRefresh = () => {
    return Request.post(`${baseUri}token/refresh`);
};

/**
 * 发送找回密码邮件
 * @param email {string}
 * @returns {Promise<AxiosResponse<T>>}
 */
export const forgotPassword = (email) => {
    return Request.post(`${baseUri}forgot-password`, {email});
};

/**
 * 通过找回密码token 获取用户详情
 * @param token
 * @returns {Promise<AxiosResponse<T>>}
 */
export const forgotPasswordInfo = (token) => {
    return Request.get(`${baseUri}forgot-password/info`, {params: {token}});
};

/**
 * 设置新的密码
 * @param data {Object}
 * @returns {Promise<AxiosResponse<T>>}
 */
export const resetPassword = (data) => {
    return Request.post(`${baseUri}reset-password`, data);
};
/**
 * 更新用户基本信息
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
export const profileUpdate = (data) => {
    return Request.post(`${baseUri}profile/update`, data);
};

export default {
    create,
    auth,
    profile,
    tokenRefresh,
    destroy,
    forgotPassword,
    forgotPasswordInfo,
    resetPassword,
    profileUpdate
};
