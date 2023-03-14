import { Axios } from "../axiosConfig";

export const createProduct = async (data: any) => {
  return await Axios().post("/product", {
    name: data.name,
    price: data.price,
    categoriesId: data.categories,
    description: data.description,
    avargePrice: data.avargePrice,
  });
};

export const createImageProduct = async (data: any) => {
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
