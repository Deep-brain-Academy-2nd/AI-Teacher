import axios, { AxiosInstance } from 'axios';

const auth: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default auth;
