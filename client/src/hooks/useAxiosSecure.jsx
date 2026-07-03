import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
});

// Configure outgoing request interceptors to inject JWT authorization tokens
axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem('access-token');
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  const activeRole = localStorage.getItem('active-role');
  if (activeRole) {
    config.headers['x-persona-role'] = activeRole;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default function useAxiosSecure() {
  return axiosSecure;
}
