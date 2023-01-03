import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { resolve } from 'path';
import { editFileName, imageFilter } from 'src/utils/file-upload.utils';
import { PhotoProduct } from './entities/photo-product.entity';
import { PhotoProductService } from './photo-product.service';

@Controller('photo-product')
export class PhotoProductController {
  constructor(private readonly photoProductService: PhotoProductService) {}

  @Post(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${resolve()}/assets/uploads/images`,
        filename: editFileName,
      }),
      fileFilter: imageFilter,
    }),
  )
  async uploadedFile(
    @UploadedFile() file,
    @Param('id') id: number,
  ): Promise<PhotoProduct> {
    return this.photoProductService.upload(file, id);
  }

  @Delete(':id')
  async deletFile(@Param('id') id: number): Promise<boolean> {
    return this.photoProductService.delete(id);
  }
}
