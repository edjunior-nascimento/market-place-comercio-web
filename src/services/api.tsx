
import axios from 'axios';
import { attachRequestInterceptor } from './interceptors/requestInterceptor';
import { attachResponseInterceptor } from './interceptors/responseInterceptor';

const API_BASE_URL = 'http://localhost:3001/api'
const API_TIMEOUT_MS = 15000;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

// attachRequestInterceptor(api);
// attachResponseInterceptor(api);

export default api;