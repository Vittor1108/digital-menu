import { InfoType } from "@/Contexts/interfaces/IAppContext";
import { AxiosResponse } from "axios";
import { Axios } from "../axiosConfig";
const infoUser = (): Promise<AxiosResponse<InfoType>> => {
  return Axios().get<InfoType>("/auth");
};

export const AuthService = {
  infoUser,
};
