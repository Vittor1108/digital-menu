import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PaginationCategroyDto } from './dto/pagination-category';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AllCategories, Category } from './entities/category.entity';

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
  ): Promise<Category> {
    return this.categoryService.updated(updtaedCategoryDto, id, req);
  }

  @Get('/take=:take/skip=:skip/text=:text?')
  findAll(
    @Request() req: any,
    @Param() params: PaginationCategroyDto,
  ): Promise<AllCategories> {
    return this.categoryService.findAll(req, params);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Request() req: any): Promise<boolean> {
    return this.categoryService.delete(id, req);
  }
}
