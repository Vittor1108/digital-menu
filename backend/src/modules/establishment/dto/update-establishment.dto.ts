import { PartialType } from '@nestjs/mapped-types';
import { EstablishmentDto } from './create-establishment.dto';

export class UpdateEstablishmentDto extends PartialType(EstablishmentDto) {}
