import {
  Controller,
  Post,
  UseGuards,
  Body,
  Request,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IReq } from 'src/@types/req';
import { PaginationCategroyDto } from '../category/dto/pagination-category';
import { CreateIngredientsDto } from './dto/create-ingredients.dto';
import { UpdateIngredientsDto } from './dto/update-ingredients.dto';
import { Ingredients } from './entities/ingredients.entity';
import { IngredientsService } from './ingredients.service';

@Controller('raw-material')
@UseGuards(AuthGuard('jwt'))
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  create(
    @Body() createDto: CreateIngredientsDto,
    @Request() req: IReq,
  ): Promise<Ingredients> {
    return this.ingredientsService.create(req, createDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Ingredients> {
    return this.ingredientsService.findOne(id);
  }

  @Get('/take=:take?/skip=:skip?/text=:text?')
  findAll(
    @Param() pagination: PaginationCategroyDto,
    @Request() req: IReq,
  ): Promise<{ count: number; ingredients: Ingredients[] }> {
    return this.ingredientsService.findAll(pagination, req);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.ingredientsService.delete(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateDto: UpdateIngredientsDto,
    @Request() req: IReq,
  ) {
    return this.ingredientsService.update(id, updateDto, req);
  }
}
