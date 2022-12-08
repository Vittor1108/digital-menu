import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class PhotoUserService {
  constructor(private readonly prismaService: PrismaService) {}
  public upload = async (file: Express.Multer.File) => {
    const photo = 
  };
}
