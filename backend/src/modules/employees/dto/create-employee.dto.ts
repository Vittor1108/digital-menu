import { IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsNotEmpty()
  acessScreens: Array<number>;
}
