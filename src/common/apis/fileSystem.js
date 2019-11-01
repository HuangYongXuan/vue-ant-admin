import Request from '@/common/Request';

export const upload = (data) => {
    return Request.post('/api/file/system/upload/image', data, {headers: {'content-type': 'multipart/form-data'}})
};

export default {
    upload
}
