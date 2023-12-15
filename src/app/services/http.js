import apiRequest from './apiService/apiService';

const headers = {
  applicationJson: 'application/json',
  multipartFormData: 'multipart/form-data',
  acceptLanguage: 'es',
};

const get = async (url, responseType, header = {}) => {
  return apiRequest({
    method: 'GET',
    url,
    responseType,
    headers: header,
  })
    .then((res) => {
      const { code } = res;
      if (res && responseType === 'arraybuffer') {
        return res;
      }

      const { data } = res.data;
      if (code === 200 && data.length > 0) {
        return data;
      }
      if (code === 400 || code === 403) {
        throw data;
      }
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

const post = async (url, body, header) => {
  return apiRequest({
    method: 'POST',
    url,
    data: body,
    headers: {
      'Content-Type': header || headers.applicationJson,
    },
  })
    .then((res) => {
      const { code } = res;
      const { data } = res.data;
      if (code === 200 && Object.keys(data).includes('id')) {
        return data;
      }
      if (code === 200 && data.length !== 0) {
        return data;
      }
      if (code === 400) {
        throw res.data;
      }
      if (code === 403) {
        throw data;
      }
      if (code === 422) {
        throw res.data;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
    });
};

const put = async (url, body, header, method = "POST") => {
  return apiRequest({
    method,
    url,
    data: body,
    headers: {
      'Content-Type': header || headers.multipartFormData,
      'Accept-Language': headers.acceptLanguage,
    },
  })
    .then((res) => {
      const { code } = res;
      const { data } = res.data;
      if (code === 200 && Object.keys(data).includes('id')) {
        return data;
      }
      if (code === 400) {
        throw res.data;
      }
      if (code === 403) {
        throw data;
      }
      if (code === 422) {
        throw res.data;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
    });
};

const _delete = async (url) => {
  return apiRequest({
    method: 'DELETE',
    url,
  })
    .then((res) => {
      const { code } = res;
      const { data } = res.data;
      if (code === 200) {
        return data;
      }
      if (code === 400 || code === 403 || code === 404) {
        throw data;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
    });
};

export default {
  get,
  post,
  put,
  delete: _delete,
};
