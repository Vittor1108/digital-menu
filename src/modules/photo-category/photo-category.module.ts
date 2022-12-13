import { Module } from '@nestjs/common';
import { PhotoCategoryService } from './photo-category.service';
import { PhotoCategoryController } from './photo-category.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [PhotoCategoryController],
  providers: [PhotoCategoryService, PrismaService],
})
export class PhotoCategoryModule {}
