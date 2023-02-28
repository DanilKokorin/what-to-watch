import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { Movies } from '../mocks/movieType';
import { getToken } from './token';

export const baseUrl = process.env.APP_BASE_URL;

export const apiClient: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

apiClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getToken();

  if (token) {
    config.headers!['x-token'] = token;
  }

  return config;
});

export async function getMovies(url: string): Promise<Movies | AxiosError> {
  try {
    return apiClient
      .get<Movies>(process.env.REACT_APP_API_URL + url)
      .then((res: AxiosResponse) => res.data.data);
  } catch (e: any) {
    const error = e as AxiosError;
    return error;
  }
}
