import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  cpfCnpj: string;
}
