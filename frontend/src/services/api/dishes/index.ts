import { IDishes, ISalesAccount } from "@interfaces/IDishes";
import { IFiles } from "@interfaces/IFiles";
import { AxiosResponse } from "axios";
import { Axios } from "../axiosConfig";
import { IPagination } from "@interfaces/IPagination";

export const createProduct = async (
  data: IDishes
): Promise<AxiosResponse<IDishes>> => {
  return await Axios().post("/product", {
    name: data.name,
    price: data.price,
    categoriesId: data.categoriesId,
    description: data.description,
    avargePrice: data.avargePrice,
  });
};

export const createImageProduct = async (data: IFiles): Promise<any> => {
  const formData = new FormData();
  Array.from(data.files).forEach((file: File) => {
    formData.append("files", file as File);
  });

  return await Axios().post(`/photo-product/${data.id}`, formData);
};

export const getDisheById = async (
  id: number
): Promise<AxiosResponse<IDishes>> => {
  return await Axios().get(`/product/${id}`);
};

export const updatedDishe = async (
  id: number,
  data: IDishes
): Promise<AxiosResponse<IDishes>> => {
  return await Axios().put(`/product/${id}`, {
    name: data.name,
    price: data.price,
    categoriesId: data.categoriesId,
    description: data.description,
    avargePrice: data.avargePrice,
  });
};

export const deleteImageDishe = async (
  id: number
): Promise<AxiosResponse<boolean>> => {
  return await Axios().delete(`/photo-product/${id}`);
};

const getAll = async (
  dataParams?: IPagination
): Promise<AxiosResponse<{ dishes: IDishes[]; quantity: number }>> => {
  return await Axios().get<{ dishes: IDishes[]; quantity: number }>(
    `product/take=${dataParams?.take}/skip=${dataParams?.skip}/text=${dataParams?.text}`
  );
};

const deleteDishe = async (id: number): Promise<AxiosResponse<boolean>> => {
  return await Axios().delete<boolean>(`/product/${id}`);
};

const sellsAccount = async (date?: {
  finalDate: Date;
  initialDate: Date;
}): Promise<AxiosResponse<ISalesAccount>> => {
  return await Axios().get(
    `/product/salesAccount/initialDate=${date?.initialDate}/finalDate=${date?.finalDate}`
  );
};

export const DishesService = {
  createProduct,
  createImageProduct,
  getDisheById,
  updatedDishe,
  deleteImageDishe,
  getAll,
  deleteDishe,
  sellsAccount,
};
