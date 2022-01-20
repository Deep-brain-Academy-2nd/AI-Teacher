import axios, { AxiosInstance } from "axios";
import { store } from "../pages/_app";

const auth: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${store.getState()?.user?.token?.token}`,
  },
  withCredentials: true,
});

export default auth;
