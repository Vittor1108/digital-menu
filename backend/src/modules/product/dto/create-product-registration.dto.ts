import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductRegistrationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsArray()
  @IsNotEmpty()
  categories_id: Array<number>;
}
