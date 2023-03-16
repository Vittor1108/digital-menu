export interface IForm {
  name: string;
  price: number | string;
  categoriesId: number[];
  description: string;
  avargePrice?: number;
}
