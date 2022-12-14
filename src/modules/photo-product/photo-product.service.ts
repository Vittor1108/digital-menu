import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import { removeFile } from 'src/utils/file-upload.utils';
import { PhotoProduct } from './entities/photo-product.entity';

@Injectable()
export class PhotoProductService {
  private pathImage = 'src/assets/uploads/images';
  constructor(private readonly prismaService: PrismaService) {}

  public upload = async (
    file: Express.Multer.File,
    id: number,
  ): Promise<PhotoProduct> => {
    const productExitis = await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });

    if (!productExitis) {
      throw new HttpException(
        HelpMessager.product_not_exits,
        HttpStatus.BAD_REQUEST,
      );
    }

    const photo = await this.prismaService.productPhoto.create({
      data: {
        filename: file.filename,
        originalname: file.originalname,
        url: `${resolve()}/${this.pathImage}/${file.filename}`,
        product_id: id,
      },
    });

    return photo;
  };

  public delete = async (id: number): Promise<boolean> => {
    const productPhoto = await this.prismaService.productPhoto.findUnique({
      where: { id },
    });

    if (!productPhoto) {
      throw new HttpException(
        HelpMessager.product_not_exits,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prismaService.productPhoto.delete({
      where: {
        id,
      },
    });

    removeFile(productPhoto.filename);
    return true;
  };
}
