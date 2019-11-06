import Request from '@/common/Request';

export default class ApiMaster {
    constructor(prefix) {
        this.prefix = prefix;
    }

    /**
     * 创建接口
     * @param data
     * @param config
     * @returns {Promise<AxiosResponse<T>>}
     */
    created(data, config = {}) {
        return Request.post(this.prefix, data, config);
    }

    /**
     * 列表接口
     * @param config
     * @returns {Promise<AxiosResponse<T>>}
     */
    list(config) {
        return Request.get(this.getUrl('list'), config);
    }

    /**
     * 通过id获取
     * @param id
     * @param config
     * @returns {Promise<AxiosResponse<T>>}
     */
    get(id, config) {
        return Request.get(this.getUrl(id), config);
    }

    /**
     * 更新接口
     * @param id
     * @param data
     * @param config
     * @returns {Promise<AxiosResponse<T>>}
     */
    update(id, data, config = {}) {
        return Request.put(this.getUrl(id), data, config);
    }

    /**
     * 删除接口
     * @param id  {string}
     * @param config {AxiosRequestConfig}
     * @returns {Promise<AxiosResponse<T>>}
     */
    deleted(id, config = {}) {
        return Request.delete(this.getUrl(id), config);
    }

    getUrl(path) {
        return `${this.prefix}/${path}`;
    }

    /**
     * 获取axios请求实例
     * @returns {AxiosInstance}
     */
    request() {
        return Request;
    }
}
