import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://api.example.com', // api address
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export const get = (url, params = {}) => api.get(url, {params});

export const post = (url, data = {}) => api.post(url, data);

export const put = (url, data = {}) => api.put(url, data);

export const remove = (url) => api.delete(url);


export default api;
