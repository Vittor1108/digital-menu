import { IsArray, IsNumber, IsString } from 'class-validator';

export class UpdateProductRegistrationDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsArray()
  categories_id: Array<number>;

  @IsArray()
  rawMaterial_id: Array<number>;
}
