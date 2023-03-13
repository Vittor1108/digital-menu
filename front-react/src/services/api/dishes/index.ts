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
  
}

export const ProductService = {
  createProduct,
  createImageProduct,
};
