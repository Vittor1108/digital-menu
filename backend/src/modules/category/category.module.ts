import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'src/database/PrismaService';
import { PhotoCategoryService } from '../photo-category/photo-category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, PhotoCategoryService],
})
export class CategoryModule {}
