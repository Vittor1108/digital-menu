import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { resolve } from 'path';
import { editFileName, imageFilter } from 'src/utils/file-upload.utils';
import { PhotoCategoryService } from './photo-category.service';

@Controller('photo-category')
@UseGuards(AuthGuard('jwt'))
export class PhotoCategoryController {
  constructor(private readonly photoCategoryService: PhotoCategoryService) {}

  @Post(':id')
  @UseInterceptors(
    // FilesInterceptor('file', {
    //   storage: diskStorage({
    //     destination: `${resolve()}/assets/uploads/images`,
    //     filename: editFileName,
    //   }),
    //   fileFilter: imageFilter,
    // }),
    FilesInterceptor('files', 5, {
      fileFilter: imageFilter,
      storage: diskStorage({
        destination: `${resolve()}/assets/uploads/images`,
        filename: editFileName,
      }),
    }),
  )
  async uploadedFile(
    @UploadedFiles() files,
    @Param('id') id: number,
  ): Promise<boolean> {
    return this.photoCategoryService.upload(files, id);
  }

  @Delete(':id')
  async deletFile(@Param('id') id: number): Promise<boolean> {
    return this.photoCategoryService.deleteFile(id);
  }

  @Get()
  async sendFile(@Res() res) {
    res.sendFile('8ed28fbc966bdd21de821c63c145b0448407cfb5..jpg', {
      root: './assets',
    });
  }
}
