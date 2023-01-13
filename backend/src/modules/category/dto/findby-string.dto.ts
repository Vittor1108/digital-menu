import { IsNotEmpty, IsString } from 'class-validator';

export class FindByStringDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}
