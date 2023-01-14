import { IsOptional, IsString } from 'class-validator';

export class PaginationCategroyDto {
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
