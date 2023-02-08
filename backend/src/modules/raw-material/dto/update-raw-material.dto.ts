import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateRawMaterialDto } from './create-raw-material.dto';

export class UpdateRawMaterialDto extends PartialType(CreateRawMaterialDto) {
  @IsBoolean()
  @IsOptional()
  isAddedProduct: boolean;
}
