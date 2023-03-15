import { AxiosResponse } from "axios";
import { Axios } from "../axiosConfig";
import { ICreateImageProduct } from "./interfaces/ICreateImageDishes";
import { IDhes } from "./interfaces/IDishes";

export const createProduct = async (data: IDhes): Promise<AxiosResponse<IDhes>> => {
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
  Array.from(data.files).forEach((file: any) => {
    formData.append("files", file as File);
  });
  return await Axios().post(`/photo-product/${data.productId}`, formData);
};

export const ProductService = {
  createProduct,
  createImageProduct,
};
