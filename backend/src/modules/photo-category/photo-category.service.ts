import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PhotoCategory } from '@prisma/client';
import { resolve } from 'path';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import { removeFile } from 'src/utils/file-upload.utils';

@Injectable()
export class PhotoCategoryService {
  private pathImage = 'src/assets/uploads/images';

  constructor(private readonly prismaService: PrismaService) {}

  public upload = async (
    file: Express.Multer.File,
    id: number,
  ): Promise<PhotoCategory> => {
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

    const photo = await this.prismaService.photoCategory.create({
      data: {
        filename: file.filename,
        originalname: file.originalname,
        url: `${resolve()}/${this.pathImage}/${file.filename}`,
        category_id: id,
      },
    });

    return photo;
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
