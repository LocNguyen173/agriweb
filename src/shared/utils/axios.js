import axios from 'axios';

// Sử dụng URL động dựa trên environment
const baseURL = process.env.VUE_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://agriweb-production.up.railway.app'  // Fallback cho Railway
    : 'http://localhost:3000');

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 100000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;