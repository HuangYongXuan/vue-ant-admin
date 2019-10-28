import {notification} from 'ant-design-vue'

export const Utils = {
    routeMeta (name, hidden, only, perms, icon) {
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
    async responseHandler(response, showSuccess = false, showError = true, successMsg = undefined,  errorMsg = undefined) {
        if (response.data.success === true) {
            if (showSuccess) {
                notification.success({
                    duration: 4.5,
                    message: '操作成功',
                    description: successMsg | response.data.message
                })
            }
            return  Promise.resolve(response.data)
        } else {
            if (showError) {
                notification.success({
                    duration: 4.5,
                    message: '操作成功',
                    description: errorMsg | response.data.message
                })
            }
            return  Promise.reject(response)
        }
    }
};


export default Utils;