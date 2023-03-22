import { AxiosResponse } from "axios";
import { Axios } from "../axiosConfig";
import { ICategorie } from "@interfaces/ICategorie";
import { IPaginationCategorie } from "./interfaces/IPaginationCategorie";
import { IFiles } from "@interfaces/IFiles";


const getAllCategories = async (
  dataParams?: IPaginationCategorie
): Promise<AxiosResponse<ICategorie[]>> => {
  return await Axios().get<ICategorie[]>(
    `category/take=${dataParams?.take ? dataParams?.take : ""}/skip=${dataParams?.skip ? dataParams?.skip : ""
    }/text=${dataParams?.text ? dataParams?.text : ""}`
  );
};


const createCategory = async ({ name, description }: ICategorie): Promise<AxiosResponse<ICategorie>> => {
  return await Axios().post('/category', {
    name,
    description
  });
}

const createImageCategory = async (data: IFiles): Promise<AxiosResponse<boolean>> => {
  const formData = new FormData();
  Array.from(data.files).forEach((file: File) => {
    formData.append("files", file as File);
  });
  return await Axios().post(`/photo-category/${data.id}`, formData);
}

export const CategorieService = {
  getAllCategories,
  createCategory,
  createImageCategory
};
