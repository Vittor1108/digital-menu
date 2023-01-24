import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { resolve } from 'path';
import { editFileName, imageFilter } from 'src/utils/file-upload.utils';
import { PhotoEmployeesService } from './photo-employees.service';

@UseGuards(AuthGuard('jwt'))
@Controller('photo-employees')
export class PhotoEmployeesController {
  constructor(private readonly photoEmployeesService: PhotoEmployeesService) {}

  @Post(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageFilter,
      storage: diskStorage({
        destination: `${resolve()}/assets/uploads/images`,
        filename: editFileName,
      }),
    }),
  )
  create(@UploadedFile() files, @Param('id') id: number): Promise<boolean> {
    return this.photoEmployeesService.create(files, id);
  }

  @Delete(':id')
  deleteFile(@Param('id') id: number): Promise<boolean> {
    return this.photoEmployeesService.deleteFile(id);
  }
}
