import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { HTTP_CODE } from '../constants';
import { getToken } from './token';

export const BACKEND_URL = process.env.APP_BASE_URL;
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  const setAuthHeader = (config: any, token: string | null): void => {
    config.headers.Authorization = `Bearer ${token}`;
  };

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      // config.headers['x-token'] = token;
      setAuthHeader(config, token);
    }

    return config;
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: any) => {
      if (error.response.status !== HTTP_CODE.OK) {
        toast.warn(`Ответ от сервера: ${error.response.status}`);
      }

      return Promise.reject(error);
    }
  );

  return api;
};
