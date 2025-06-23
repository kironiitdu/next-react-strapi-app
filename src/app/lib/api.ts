/**
 * This API will always call the local host API endpoint
 * Will extract API as return
 * If token already in local storage then will get from there
 * Attached token to reqeust header
 *
 *
 */
import axios from "axios";
import { getToken } from "../utils/tokenUtils";

console.log("Using API base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
const api = axios.create({
  // baseURL: 'http://localhost:1337/api',
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  console.log("Using API base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
