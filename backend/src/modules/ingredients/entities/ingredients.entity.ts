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

// name: createDto.name,
// quantityGg: createDto.quantity,
// measureRegister: createDto.measureRegister,
// establishmentId: req.user.id,
// averagePrice: createDto.price,
// averagePriceGg: this.calcPriceG(createDto.quantity, createDto.price),

// {
// 	"id": 2,
// 	"name": "Arroz",
// 	"quantityGg": 5000,
// 	"averagePrice": 31.5,
// 	"averagePriceGg": 0.63,
// 	"measureRegister": 1,
// 	"user_id": 1
// }
