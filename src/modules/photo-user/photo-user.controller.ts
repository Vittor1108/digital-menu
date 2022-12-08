import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFilter } from 'src/utils/file-upload.utils';
import { PhotoUserService } from './photo-user.service';
import { resolve } from 'path';
@Controller('photo-user')
export class PhotoUserController {
  constructor(private readonly photoUserService: PhotoUserService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${resolve()}/src/assets/uploads/images`,
        filename: editFileName,
      }),
      fileFilter: imageFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    return this.photoUserService.upload(file);
  }
}
