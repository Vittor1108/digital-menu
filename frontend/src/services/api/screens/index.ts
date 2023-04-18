import { Axios } from "../axiosConfig";
import { IScreens } from "@interfaces/IScreens";
import { AxiosResponse } from "axios";

const getAllScreens = async (): Promise<AxiosResponse<IScreens[]>> => {
  return Axios().get<IScreens[]>("screens");
};

export const ScreensService = {
  getAllScreens,
};
