import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateCustomerOrderDto } from './create-customer-order.dto';

export class UpdateCustomerOrderDto extends PartialType(
  CreateCustomerOrderDto,
) {
  @IsNumber()
  @IsOptional()
  id: number;
  @IsString()
  status: 'RECEIVED' | 'PREPARATION' | 'FINISHED' | 'CONCLUDED';
}
