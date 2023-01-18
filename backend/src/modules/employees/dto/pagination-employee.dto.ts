import { IsOptional, IsString } from 'class-validator';

export class PaginationEmployee {
  @IsString()
  @IsOptional()
  text: string;

  @IsString()
  @IsOptional()
  take: string;

  @IsString()
  @IsOptional()
  skip: string;
}
