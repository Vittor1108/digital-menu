import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { CreateCustomerOrderDto } from './create-customer-order.dto';

export class UpdateCustomerOrderDto extends PartialType(
  CreateCustomerOrderDto,
) {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  status: 'RECEIVED' | 'PREPARATION' | 'FINISHED' | 'CONCLUDED' | 'CANCELED';

  @IsOptional()
  finalTime: Date;

  @IsOptional()
  timeFinished: Date;

  @IsOptional()
  timePreparation: Date;

  @IsOptional()
  timeReceived: Date;
}
