import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoEmployeeDto } from './create-photo-employee.dto';

export class UpdatePhotoEmployeeDto extends PartialType(CreatePhotoEmployeeDto) {}
