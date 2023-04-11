import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerOrderDto } from './create-customer-order.dto';
import { IsString } from 'class-validator';

export class UpdateCustomerOrderDto extends PartialType(
  CreateCustomerOrderDto,
) {
  @IsString()
  status: 'RECEIVED' | 'PREPARATION' | 'FINISHED' | 'CONCLUDED';
}
