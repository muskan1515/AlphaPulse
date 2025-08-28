import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  withCredentials: true,
  timeout: 1000000
});

let isRefreshing = false;
let queue: Array<{ resolve: (token: string) => void, reject: (err:any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  queue.forEach(p => (token ? p.resolve(token) : p.reject(error)));
  queue = [];
};

API.interceptors.response.use(response => response, async (error) => {
  const original = error.config;
  if (error.response?.status === 401 && !original._retry) {
    original._retry = true;
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve: (token: string) => {
          original.headers['Authorization'] = `Bearer ${token}`;
          resolve(API(original));
        }, reject});
      });
    }
    isRefreshing = true;
    try {
      const r = await API.post('/auth/refresh');
      const newAccess = r.data.accessToken;
      if (newAccess) localStorage.setItem('accessToken', newAccess);
      API.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`;
      processQueue(null, newAccess);
      return API(original);
    } catch (err) {
      processQueue(err, null);
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      return Promise.reject(err);
    } finally { isRefreshing = false; }
  }
  return Promise.reject(error);
});

API.interceptors.request.use(config => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  if (token && config.headers) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export default API;
