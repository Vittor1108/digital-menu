import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoCategoryDto } from './create-photo-category.dto';

export class UpdatePhotoCategoryDto extends PartialType(CreatePhotoCategoryDto) {}
