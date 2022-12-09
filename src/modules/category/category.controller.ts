import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
@UseGuards(AuthGuard('jwt'))
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Request() req: any,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryDto, req);
  }

  @Patch(':id')
  updated(
    @Body() updtaedCategoryDto: UpdateCategoryDto,
    @Param('id') id: number,
    @Request() req: any,
  ) {
    return this.categoryService.updated(updtaedCategoryDto, id, req);
  }
}
