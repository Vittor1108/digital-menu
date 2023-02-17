import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateIngredientsDto } from './create-ingredients.dto';

export class UpdateIngredientsDto extends PartialType(CreateIngredientsDto) {
  @IsBoolean()
  @IsOptional()
  isAddedProduct: boolean;
}
