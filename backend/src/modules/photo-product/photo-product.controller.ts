import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { resolve } from 'path';
import { editFileName, imageFilter } from 'src/utils/file-upload.utils';
import { PhotoProductService } from './photo-product.service';

@Controller('photo-product')
@UseGuards(AuthGuard('jwt'))
export class PhotoProductController {
  constructor(private readonly photoProductService: PhotoProductService) {}

  @Post(':id')
  @UseInterceptors(
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
    return this.photoProductService.upload(files, id);
  }

  @Delete(':id')
  async deletFile(@Param('id') id: number): Promise<boolean> {
    return this.photoProductService.delete(id);
  }
}
