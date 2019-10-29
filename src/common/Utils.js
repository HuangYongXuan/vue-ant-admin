import {notification} from 'ant-design-vue';
import {install} from 'vuex';

export const Utils = {
    routeMeta(name, hidden, only, perms, icon) {
        return {meta: {name, hidden, only, perms, icon}};
    },
    /**
     * 处理 http的响应结果
     * @param response      {Object}        // response的数据 由axios提供返回
     * @param showSuccess   {boolean}       // 是否显示成功消息，默认不现实
     * @param showError     {boolean}       // 是否现象错误消息，默认显示
     * @param successMsg    {string}        // 自定义成功消息
     * @param errorMsg      {string}        // 自定义错误消息
     * @returns {Promise<unknown>}
     */
    async responseHandler(response, showSuccess = false, showError = true, successMsg = undefined, errorMsg = undefined) {
        console.info(response.data);
        if (response.data.success === true) {
            if (showSuccess) {
                notification.success({
                    duration: 4.5,
                    message: '提示',
                    description: successMsg || response.data.message
                });
            }
            return Promise.resolve(response.data);
        } else {
            if (showError) {
                notification.error({
                    duration: 4.5,
                    message: '错误',
                    description: errorMsg || response.data.message
                });
            }
            return Promise.reject(response);
        }
    }
};

/**
 * 简单生成最长10位的Uuid
 *
 * @param prefix    {string}    default: ''     前缀
 * @param size      {number}    default: 6      uuid长度 最长10位
 * @return          {string}
 */
export const generateUuid = (prefix = '', size = 6) => {
    return prefix + Math.random().toString(36).slice(2, size + 2);
};

export default {
    ...Utils
};
