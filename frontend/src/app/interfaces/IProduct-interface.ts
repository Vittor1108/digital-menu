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
