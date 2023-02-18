import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Measure } from '@prisma/client';

export class CreateIngredientsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsEnum(Measure)
  @IsNotEmpty()
  measureRegister: Measure;
}
