export interface IOrder {
  product: {
    name: string;
    price: number;
    ProductPhoto: {
      url: string;
    }[];
  };
  sellsQuantity: number;
  income: number;
}
