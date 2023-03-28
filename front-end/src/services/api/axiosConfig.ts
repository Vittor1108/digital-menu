import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { API_URL } from "../../Constants";

export const Axios = (): AxiosInstance => {
  const userToken = localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token");
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Authorization': `Bearer ${userToken}` 
    }
  });
};
