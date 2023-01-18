import {
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFilter } from 'src/utils/file-upload.utils';
import { PhotoUserService } from './photo-user.service';
import { resolve } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { IReq } from 'src/@types/req';

@Controller('photo-user')
@UseGuards(AuthGuard('jwt'))
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
  async uploadedFile(@UploadedFile() file, @Request() req: IReq) {
    return this.photoUserService.upload(file, req);
  }

  @Delete(':id')
  async deletFile(@Param('id') id: number) {
    return this.photoUserService.deleteFile(id);
  }
}
