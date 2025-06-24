/**
 * This API will always call the local host API endpoint
 * Will extract API as return
 * If token already in local storage then will get from there
 * Attached token to reqeust header
 *
 *
 */

import axios from "axios";
import { getToken } from "@/app/utils/tokenUtils";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
