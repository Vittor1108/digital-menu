import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductRegistrationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  categories_id: Array<number>;

  @IsArray()
  rawMaterial_id: Array<number>;
}
