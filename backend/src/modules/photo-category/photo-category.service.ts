import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import { PhotoCategory } from 'src/modules/photo-category/entities/photo-category.entity';
import { removeFile } from 'src/utils/file-upload.utils';

@Injectable()
export class PhotoCategoryService {
  private baseURL = 'http://localhost:3000/assets/uploads/images';
  private dataPhoto: Array<PhotoCategory> = [];
  constructor(private readonly prismaService: PrismaService) { }

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

    if (Array.isArray(files)) {
      if (!files.length) throw new HttpException('Imagem não enviada', HttpStatus.BAD_REQUEST);

      this.dataPhoto = files.map((file: PhotoCategory) => {
        return {
          filename: file.filename,
          originalname: file.originalname,
          url: `${this.baseURL}/${file.filename}`,
          category_id: id,
        };
      });
    }
    console.log(files);
    await this.prismaService.photoCategory.createMany({
      data: this.dataPhoto,
    });

    return true;
  };

  public deleteFile = async (id: number): Promise<boolean> => {
    const files = await this.prismaService.photoCategory.findMany({
      where: {
        category_id: Number(id),
      }
    });

    if (!files.length) {
      throw new HttpException(
        HelpMessager.photo_not_found,
        HttpStatus.BAD_REQUEST,
      );
    }

    files.forEach(file => {
      removeFile(file.filename);
    })

    await this.prismaService.photoCategory.deleteMany({
      where: {
        category_id: Number(id),
      },
    });

    return true;
  };
}
