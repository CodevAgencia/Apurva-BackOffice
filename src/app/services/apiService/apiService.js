import axios from 'axios';

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_APURVA_API,
  headers: {
    Accept: 'application/json',
    'Accept-Language': 'es',
  },
});

const apiRequest = (options) => {
  const onSuccess = (response) => {
    return response.data;
  };

  const onError = (error) => {
    console.info('Request Failure', error.config);

    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else {
      console.error('Error message:', error.message);
    }
    return Promise.reject(error.response || error.message);
  };

  return Axios(options).then(onSuccess).catch(onError);
};

export default apiRequest;
