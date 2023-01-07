import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import { PhotoCategory } from 'src/modules/photo-category/entities/photo-category.entity';
import { removeFile } from 'src/utils/file-upload.utils';

@Injectable()
export class PhotoCategoryService {
  private baseURL = 'http://localhost:3000/assets/uploads/images';
  private dataPhoto: Array<PhotoCategory> = [];
  constructor(private readonly prismaService: PrismaService) {}

  public upload = async (
    files: Express.Multer.File,
    id: number,
  ): Promise<boolean> => {
    const category = await this.prismaService.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new HttpException(
        HelpMessager.category_not_exits,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!files) {
      throw new HttpException('Imagem não enviada', HttpStatus.BAD_REQUEST);
    }

    if (Array.isArray(files)) {
      this.dataPhoto = files.map((file: PhotoCategory) => {
        return {
          filename: file.filename,
          originalname: file.originalname,
          url: `${this.baseURL}/${file.filename}`,
          category_id: id,
        };
      });
    }

    await this.prismaService.photoCategory.createMany({
      data: this.dataPhoto,
    });

    return true;
  };

  public deleteFile = async (id: number): Promise<boolean> => {
    const file = await this.prismaService.photoCategory.findUnique({
      where: {
        id,
      },
    });

    if (!file) {
      throw new HttpException(
        HelpMessager.photo_not_found,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prismaService.photoCategory.delete({
      where: {
        id,
      },
    });

    removeFile(file.filename);
    return true;
  };
}
