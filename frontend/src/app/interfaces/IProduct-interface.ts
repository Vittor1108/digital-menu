import { IPhotocategory } from './IUpload-photo.interface';

export interface ICreateProduct {
  id: number;
  name: string;
  category: Array<number>;
  price: number;
  description: string;
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
}

export interface IProductCategory {
  category_id: number;
  category: {
    name: string;
  };
}
