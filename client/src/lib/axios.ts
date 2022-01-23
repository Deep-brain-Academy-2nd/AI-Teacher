import axios, { AxiosInstance } from "axios";
import { store } from "../pages/_app";

const auth: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

auth.interceptors.request.use(function (config) {
  const token = store.getState().user.token.token;

  auth.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return config;
});

export default auth;
