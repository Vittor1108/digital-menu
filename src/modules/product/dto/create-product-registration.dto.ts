import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductRegistrationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
