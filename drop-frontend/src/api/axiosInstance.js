import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://drop.bonto.run/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('drop_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
