import { AxiosResponse } from "axios";
import { Axios } from "../axiosConfig";
import { IScreens } from "@interfaces/IScreens";

const validateToken = (): Promise<AxiosResponse<IScreens[]>> => {
  return Axios().get<IScreens[]>("/auth");
};

export const AuthService = {
  validateToken,
};
