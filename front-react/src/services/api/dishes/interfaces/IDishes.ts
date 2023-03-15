export interface IDhes {
  id?: number;
  name: string;
  price: number;
  categoriesId: number[];
  description: string;
  avargePrice: number | null;
}
