export interface IDishes {
  id?: number;
  name: string;
  price: number;
  categoriesId: number[];
  description: string;
  avargePrice?: number;
  ProductCategory?: ProductCategory[];
  ProductPhoto?: ProductPhoto[];
}

export interface ProductCategory {
  category: {
    id: number;
    name: string;
    description: string;
  };
}

export interface ProductPhoto {
  id: number;
  product_id: number;
  filename: string;
  url: string;
  originalname: string;
}
