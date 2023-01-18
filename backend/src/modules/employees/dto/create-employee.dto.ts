import { IsEmail, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
