import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientsDto } from './create-ingredients.dto';

export class UpdateIngredientsDto extends PartialType(CreateIngredientsDto) {}
