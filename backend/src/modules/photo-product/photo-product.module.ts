import { Module } from '@nestjs/common';
import { PhotoProductService } from './photo-product.service';
import { PhotoProductController } from './photo-product.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [PhotoProductController],
  providers: [PhotoProductService, PrismaService],
})
export class PhotoProductModule {}
