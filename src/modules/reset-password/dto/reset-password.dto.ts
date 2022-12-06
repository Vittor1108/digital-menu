import { IsString, MinLength } from 'class-validator';

export class ResetPassworDto {
  @IsString()
  @MinLength(6)
  password: string;
}
