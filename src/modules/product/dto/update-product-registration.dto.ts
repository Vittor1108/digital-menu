import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductRegistrationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
