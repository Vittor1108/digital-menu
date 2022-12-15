import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoUserDto } from './create-photo-user.dto';

export class UpdatePhotoUserDto extends PartialType(CreatePhotoUserDto) {}
