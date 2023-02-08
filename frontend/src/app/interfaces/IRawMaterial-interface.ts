export interface ICreateRawMaterial {
  name: string;
  measure: Array<{ id: number; name: string }>;
  price: number;
  qtd: number;
}

export interface IRawMaterial {
  id?: number;
  averagePrice: number;
  averagePriceGg: number;
  name: string;
  quantityGg: number;
  user_id?: number;
  measureRegister: number;
}

export interface IRegisterRawMaterialProduct {
  measure: Array<{ id: number; name: string }>;
  rawMaterial: Array<{ id: number; name: string }>;
  quantity: number;
}
