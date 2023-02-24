import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { API_URL } from "../../Constants";

export const Axios = (): AxiosInstance => {
  return axios.create({
    baseURL: API_URL,
  });
};
