import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import * as qs from 'qs';

const $axios = axios.create({
    baseURL: '/',
    timeout: 15000,
    transformRequest: [(data: anyObject) => {
        return data instanceof FormData ? data : qs.stringify(data);
    }],
});

$axios.interceptors.request.use((config: AxiosRequestConfig) => {
    return config;
}, (err: AxiosError) => {
    return Promise.reject(err);
});

$axios.interceptors.response.use((response: AxiosResponse<any>) => {
    return Promise.resolve(response);
}, (err: AxiosError) => {
    return Promise.reject(err);
});

export default $axios;
