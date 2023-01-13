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
import { FindByStringDto } from './dto/findby-string.dto';
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
  ): Promise<Category> {
    return this.categoryService.updated(updtaedCategoryDto, id, req);
  }

  @Get()
  findAll(@Request() req: any): Promise<Category[]> {
    return this.categoryService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Request() req: any): Promise<boolean> {
    return this.categoryService.delete(id, req);
  }

  @Post(':id')
  findByStringOrPagination(
    @Param('id') id: number,
    @Body() data: FindByStringDto,
    @Request() req: any,
  ) {
    return this.categoryService.findByStringOrPagination(id, data, req);
  }
}
