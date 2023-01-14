export class ProductRegistration {
  id?: number;
  name: string;
  description: string;
  price: number;
  user_id?: number;
  Product_Category?: Array<Product_Category>;
  Product_Photo?: Array<ProductPhoto>;
}

interface Product_Category {
  category_id: number;
  category: {
    name: string;
  };
}

interface ProductPhoto {
  url: string;
}

export class allProducts {
  products: ProductRegistration[];
  count: number;
}
