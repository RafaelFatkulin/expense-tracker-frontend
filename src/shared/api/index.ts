import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';

export type SuccessMessage = {
  message: string;
};

export interface ErrorMessage extends AxiosError {
  response: AxiosResponse;
}

export const api = axios.create({
  baseURL: 'http://localhost:8000'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || null;
  const modifiedConfig = { ...config };
  if (token) {
    modifiedConfig.headers.Authorization = `Bearer ${token}`;
  }
  return modifiedConfig;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);
