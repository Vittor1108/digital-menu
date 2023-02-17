import { Measure } from 'src/enums/measureEnum';

export class Ingredients {
  id?: number;
  name: string;
  quantityGg: number;
  averagePrice: number;
  averagePriceGg: number;
  measureRegister: Measure;
  establishmentId: number;
}

// id: number
//   name: string
//   quantityGg: number
//   averagePrice: number
//   averagePriceGg: number
//   measureRegister: Measure
//   establishmentId: number
