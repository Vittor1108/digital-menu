import { AxiosResponse } from "axios";
import { Axios } from "../axiosConfig";
import { IScreens } from "@interfaces/IScreens";

const validateToken = (): Promise<AxiosResponse<IScreens[] | string>> => {
  return Axios().get<IScreens[] | string>("/auth");
};

export const AuthService = {
  validateToken,
};
