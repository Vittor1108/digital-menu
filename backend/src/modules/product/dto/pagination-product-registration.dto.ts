import { IsOptional, IsString } from 'class-validator';

export class PaginationProductRegistrationDto {
  @IsOptional()
  @IsString()
  skip: string;

  @IsOptional()
  @IsString()
  take: string;

  @IsOptional()
  @IsString()
  text: string;
}
