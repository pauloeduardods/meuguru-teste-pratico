import axios, { AxiosInstance } from 'axios';
import QueryString from 'qs';

const fetchAxios : AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/`,
  timeout: 1000,
  paramsSerializer: (params: any) => QueryString.stringify(params, { arrayFormat: 'repeat' }),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default fetchAxios;
