import { AxiosResponse } from "axios";
import { Axios } from "../axiosConfig";
import { ICategorie } from "@interfaces/ICategorie";
import { IPagination } from "@interfaces/IPagination";
import { IFiles } from "@interfaces/IFiles";

const getAllCategories = async (
  dataParams?: IPagination
): Promise<AxiosResponse<{ quantity: number; categories: ICategorie[] }>> => {
  return await Axios().get<{ quantity: number; categories: ICategorie[] }>(
    `category/take=${dataParams?.take ? dataParams.take : ""}/skip=${
      dataParams?.skip ? dataParams.skip : ""
    }/text=${dataParams?.text ? dataParams.text : ""}`
  );
};

const createCategory = async ({
  name,
  description,
}: ICategorie): Promise<AxiosResponse<ICategorie>> => {
  return await Axios().post<ICategorie>("/category", {
    name,
    description,
  });
};

const createImageCategory = async (
  data: IFiles
): Promise<AxiosResponse<boolean>> => {
  const formData = new FormData();
  Array.from(data.files).forEach((file: File) => {
    formData.append("files", file as File);
  });
  return await Axios().post(`/photo-category/${data.id}`, formData);
};

const getCategory = async (id: number): Promise<AxiosResponse<ICategorie>> => {
  return await Axios().get(`/category/${id}`);
};

const deleteImage = async (id: number): Promise<AxiosResponse<boolean>> => {
  return await Axios().delete(`/photo-category/${id}`);
};

const update = async (
  id: number,
  { name, description }: ICategorie
): Promise<AxiosResponse<ICategorie>> => {
  return await Axios().put(`/category/${id}`, {
    name,
    description,
  });
};

const deleteCategory = async (id: number): Promise<AxiosResponse<boolean>> => {
  return await Axios().delete<boolean>(`/category/${id}`);
};

export const CategorieService = {
  getAllCategories,
  createCategory,
  createImageCategory,
  getCategory,
  deleteImage,
  update,
  deleteCategory,
};
