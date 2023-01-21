import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeAuthDto } from './create-home-auth.dto';

export class UpdateHomeAuthDto extends PartialType(CreateHomeAuthDto) {}
