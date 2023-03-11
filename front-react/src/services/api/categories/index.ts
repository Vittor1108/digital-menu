import { AxiosResponse } from "axios";
import { ApiException } from "../ApiException";
import { Axios } from "../axiosConfig";
import { ICategorie } from "./interfaces/ICategorie";
import { IPaginationCategorie } from "./interfaces/IPaginationCategorie";

const getAllCategories = async (
  dataParams?: IPaginationCategorie
): Promise<AxiosResponse<ICategorie[]>> => {
  return await Axios().get<ICategorie[]>(
    `category/take=${dataParams?.take}/skip=${dataParams?.skip}/text=${dataParams?.text}`
  );
};

export const CategorieService = {
  getAllCategories,
};
