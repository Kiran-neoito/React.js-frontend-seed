import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { getLocalStorage, setLocalStorage } from '@/helpers/utils';
import jwt_decode from 'jwt-decode';
import { APP_ENTRYPOINT } from '@/config/config';
import { LOGIN } from '@/common/urlConstants';

const request = axios.create({
  baseURL: APP_ENTRYPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const fetchNewToken = async () => {
  try {
    const res = await request.post(`${APP_ENTRYPOINT}/auth/refresh`);
    const { token } = res.data.data;
    setLocalStorage('AUTH_DETAILS', token);
  } catch (err) {
    if ((err as AxiosError).response?.status === 401) {
      localStorage.removeItem('AUTH_DETAILS');
      window.location.href = LOGIN;
    }
  }
};

const authenticatedRequest = axios.create({
  baseURL: APP_ENTRYPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

authenticatedRequest.interceptors.request.use(async (config) => {
  const token: string = getLocalStorage('AUTH_DETAILS');
  const { exp } = jwt_decode<{ name: string; exp: number }>(token);
  // if (dayjs(exp * 1000).isBefore(dayjs(new Date()))) {
  if (dayjs(exp * 1000).diff(dayjs(), 'minutes') < 5) {
    fetchNewToken();
  }
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export { request, authenticatedRequest };
