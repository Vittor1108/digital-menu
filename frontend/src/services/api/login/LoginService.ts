import { AxiosResponse } from "axios";
import { ApiException } from "../ApiException";
import { Axios } from "../axiosConfig";
import { ICreateAccount } from "./interfaces/ICreateAccount";

const validateUser = async (
  login: string,
  password: string
): Promise<AxiosResponse<{ token: string }>> => {
  return Axios().post<{ token: string }>("/auth", {
    email: login,
    password,
  });
};

export const LoginService = {
  validateUser,
};
