import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductRegistrationDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsArray()
  categoriesId: Array<number>;

  @IsOptional()
  @IsNumber()
  avargePrice: number;

  @IsOptional()
  @IsArray()
  ingredients: Array<{ qtd: number; rawMaterialId: number }>;
}
