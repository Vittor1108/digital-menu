import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { IReq } from 'src/@types/req';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import { removeFile } from 'src/utils/file-upload.utils';
import { PhotoUser } from './entities/photo-user.entity';

@Injectable()
export class PhotoUserService {
  constructor(private readonly prismaService: PrismaService) {}

  private pathImage = 'src/assets/uploads/images';

  public upload = async (
    file: Express.Multer.File,
    req: IReq,
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
    removeFile(photo.filename);
    return true;
  };
}
