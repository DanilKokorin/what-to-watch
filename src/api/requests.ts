import axios, { AxiosError } from 'axios';

export async function baseGetRequest(path: string, params?: any) {
  try {
    const response = await axios.get(process.env.REACT_APP_API_URL + path, {
      params,
    });
    return response.data;
  } catch (e: unknown) {
    const error = e as AxiosError;
    return error;
  }
}
export async function basePostRequest(path: string, body: any) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + path,
      body
    );
    return response.data;
  } catch (e: unknown) {
    const error = e as AxiosError;
    return error;
  }
}
