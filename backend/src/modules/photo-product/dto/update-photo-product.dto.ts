import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoProductDto } from './create-photo-product.dto';

export class UpdatePhotoProductDto extends PartialType(CreatePhotoProductDto) {}
