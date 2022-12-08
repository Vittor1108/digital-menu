import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { resolve } from 'path';
import { PhotoUser } from './entities/photo-user.entity';
import { HelpMessager } from 'src/helper/messageHelper';

@Injectable()
export class PhotoUserService {
  constructor(private readonly prismaService: PrismaService) {}

  private pathImage = 'src/assets/uploads/images';

  public upload = async (
    file: Express.Multer.File,
    req: any,
  ): Promise<PhotoUser> => {
    const photo = await this.prismaService.photoUser.create({
      data: {
        filename: file.filename,
        originalname: file.originalname,
        url: `${resolve()}/${this.pathImage}/${file.filename}`,
        user_id: req.user.id,
      },
    });

    return photo;
  };

  public deleteFile = async (id: number): Promise<boolean> => {
    const photo = await this.prismaService.photoUser.findUnique({
      where: {
        id,
      },
    });

    if (!photo) {
      throw new HttpException(
        HelpMessager.photo_not_found,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prismaService.photoUser.delete({
      where: {
        id,
      },
    });
    return true;
  };
}
