import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_URL_BACKEND,
  withCredentials: true,
});
