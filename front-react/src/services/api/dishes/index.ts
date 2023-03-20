import { AxiosResponse } from "axios";
import { Axios } from "../axiosConfig";
import { ICreateImageProduct } from "./interfaces/ICreateImageDishes";
import { IDishes } from "@interfaces/IDishes";

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

export const createImageProduct = async (
  data: ICreateImageProduct
): Promise<AxiosResponse<boolean>> => {
  const formData = new FormData();
  Array.from(data.files).forEach((file: File) => {
    formData.append("files", file as File);
  });
  return await Axios().post(`/photo-product/${data.productId}`, formData);
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


export const deleteImageDishe = async (id: number): Promise<AxiosResponse<boolean>> => {
  return await Axios().delete(`/photo-product/${id}`);
}
export const DishesService = {
  createProduct,
  createImageProduct,
  getDisheById,
  updatedDishe,
  deleteImageDishe
};
