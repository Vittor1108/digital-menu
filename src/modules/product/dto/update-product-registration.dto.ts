import { PartialType } from '@nestjs/mapped-types';
import { CreateProductRegistrationDto } from './create-product-registration.dto';

export class UpdateProductRegistrationDto extends PartialType(CreateProductRegistrationDto) {}
