export interface ICreateProduct {
  name: string;
  category: Array<number>;
  price: number;
  description: string;
}

export interface ICategorySelect {
  id: number;
  name: string;
}

