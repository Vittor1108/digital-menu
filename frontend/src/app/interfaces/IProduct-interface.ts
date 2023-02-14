import { IPhotocategory } from './IUpload-photo.interface';

export interface ICreateProduct {
  id: number;
  name: string;
  category: Array<number>;
  price: number;
  description: string;
  rawMaterial_id: Array<number>;
  avargePrice: number;
  ingredients?: Array<{ qtd: number; rawMaterialId: number }>;
}

export interface ICategorySelect {
  id: number;
  name: string;
}

export interface IReturnCreatedProduct {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface IGettAllProducsts {
  id: number;
  name: string;
  description: string;
  price: number;
  ProductPhoto: IPhotocategory[];
  Product_Category: IProductCategory[];
  ProductIngredient: IProductIngrediente[];
}

export interface IProductIngrediente {
  RawMaterial: IRawMaterial;
  qtd: number;
}

export interface IRawMaterial {
  averagePrice: number;
  averagePriceGg: number;
  id: number;
  measureRegister: number;
  name: string;
}

export interface IProductCategory {
  category_id: number;
  category: {
    name: string;
  };
}

export interface IDataGetProducts {
  skip: number | string;
  take: number | string;
  text: string;
}

export interface IGetAllProductsCount {
  products: Array<IGettAllProducsts>;
  count: number;
}
