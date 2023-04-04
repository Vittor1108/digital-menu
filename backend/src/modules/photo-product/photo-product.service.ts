import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import { removeFile } from 'src/utils/file-upload.utils';
import { PhotoProduct } from 'src/modules/photo-product/entities/photo-product.entity';
@Injectable()
export class PhotoProductService {
  private baseURL = 'http://localhost:3000/assets/uploads/images';
  private dataPhotoProduct: Array<PhotoProduct> = [];
  constructor(private readonly prismaService: PrismaService) {}

  public upload = async (
    files: Express.Multer.File,
    id: number,
  ): Promise<boolean> => {
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

    if (Array.isArray(files)) {
      this.dataPhotoProduct = files.map((file: PhotoProduct) => {
        return {
          filename: file.filename,
          originalname: file.originalname,
          url: `${this.baseURL}/${file.filename}`,
          product_id: id,
        };
      });
    }

    console.log(this.dataPhotoProduct);

    await this.prismaService.productPhoto.createMany({
      data: this.dataPhotoProduct,
    });
    return true;
  };

  public delete = async (id: number): Promise<boolean> => {
    try {
      const productPhoto = await this.prismaService.productPhoto.findMany({
        where: {
          product_id: Number(id),
        },
      });

      productPhoto.forEach((product) => {
        removeFile(product.filename);
      });

      if (!productPhoto || !productPhoto.length) {
        throw new HttpException(
          HelpMessager.product_not_exits,
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.prismaService.productPhoto.deleteMany({
        where: {
          product_id: Number(id),
        },
      });

      return true;
    } catch (e: any) {
      return e.message;
    }
  };
}
