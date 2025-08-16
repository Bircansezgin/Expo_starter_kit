import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '@env';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: parseInt(API_TIMEOUT, 10),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json,text/plain,*/*',
  },
});
