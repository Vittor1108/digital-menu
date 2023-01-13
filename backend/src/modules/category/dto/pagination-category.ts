import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PaginationCategroyDto {
  @IsNotEmpty()
  @IsString()
  skip: string;

  @IsNotEmpty()
  @IsString()
  take: string;

  @IsOptional()
  @IsString()
  text: string;
}
