import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class PhotoProductService {
  private pathImage = 'src/assets/uploads/images';
  constructor(private readonly prismaService: PrismaService) {}

  public upload = async (
    file: Express.Multer.File,
    id: number,
  ): Promise<any> => {
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
}
