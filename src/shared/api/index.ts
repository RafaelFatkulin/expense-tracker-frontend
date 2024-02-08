import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const modifiedConfig = { ...config };
  if (token) {
    modifiedConfig.headers.Authorization = `Bearer ${token}`;
  }
  return modifiedConfig;
});
