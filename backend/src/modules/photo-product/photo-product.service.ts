import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import { removeFile } from 'src/utils/file-upload.utils';
import { PhotoProduct } from './entities/photo-product.entity';

@Injectable()
export class PhotoProductService {
  private baseURL = 'http://localhost:3000/assets/uploads/images';
  constructor(private readonly prismaService: PrismaService) {}

  public upload = async (
    files: Express.Multer.File,
    id: number,
  ): Promise<string> => {
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

    // const photo = await this.prismaService.productPhoto.create({
    //   data: {
    //     filename: file.filename,
    //     originalname: file.originalname,
    //     url: `${this.baseURL}/${file.filename}`,
    //     product_id: id,
    //   },
    // });
    console.log(files);
    return 'OK';
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
