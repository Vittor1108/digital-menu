import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IReq } from 'src/@types/req';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PaginationCategroyDto } from './dto/pagination-category';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
@UseGuards(AuthGuard('jwt'))
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(
    @Body() createDto: CreateCategoryDto,
    @Request() req: IReq,
  ): Promise<Category> {
    return this.categoryService.create(createDto, req);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<boolean> {
    return this.categoryService.delete(id);
  }

  @Get('/take=:take?/skip=:skip?/text=:text?')
  findAll(
    @Param() pagination: PaginationCategroyDto,
    @Request() req: IReq,
  ): Promise<{ quantity: number; categories: Category[] }> {
    return this.categoryService.findAll(pagination, req);
  }

  @Put(':id')
  update(
    @Request() req: IReq,
    @Param('id') id: number,
    @Body() updateDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(id, updateDto, req);
  }
}
