import {message, Modal} from 'ant-design-vue';

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
        if (response.data.success === true) {
            if (showSuccess) {
                message.success(successMsg || response.data.message, 2);
            }
            return Promise.resolve(response.data);
        } else {
            if (showError) {
                message.error(errorMsg || response.data.message, 2);
            }
            return Promise.reject(response);
        }
    },
    genTabColumn(t, k, w, di, a = 'center', slot = undefined, f = undefined) {
        let column = {
            align: a,
            title: t,
            key: k,
            width: w,
            dataIndex: di || k,
            scopedSlots: {customRender: slot || k}
        };

        if (f) {
            column.fixed = f;
        }

        return column;
    },
    onConfirmDelete(content, api) {
        Modal.confirm({
            title: '警告',
            content,
            onOk() {
                return new Promise((resolve, reject) => {
                    api(resolve, reject);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {
            }
        });
    },
    loadScript(id, url) {
        id = id + '-' + generateUuid();
        let el = document.getElementById(id);

        return new Promise((resolve, reject) => {
            if (el === null) {
                let script = document.createElement('script');
                script.setAttribute('id', id);
                script.type = 'text/javascript';
                script.src = url;
                script.onload = () => {
                    script.remove();
                    return resolve();
                };
                script.error = (err) => {
                    return reject(err);
                };
                document.body.appendChild(script);
            } else {
                return resolve();
            }
        });
    },
    /**
     *
     * @param id
     * @param urls
     * @returns {Promise<unknown[]>}
     */
    loadScripts(id, urls) {
        let results = [];
        urls.forEach((url, index) => {
            results.push(this.loadScript(id + index, url));
        });

        return Promise.all(results);
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

export const deepCopy = (object) => {
    if (object === null || object === undefined || typeof object !== 'object') {
        return object;
    }
    let isArray = Array.isArray(object);
    let newObj = {};
    if (isArray) {
        newObj = [];
    }
    for (let key in object) {
        let v = object[key];

        if (typeof v === 'object') {
            newObj[key] = deepCopy(v);
        } else {
            if (isArray) {
                newObj.push(v);
            } else {
                newObj[key] = v;
            }
        }
    }

    return newObj;
};

export default {
    ...Utils,
    generateUuid,
    deepCopy
};