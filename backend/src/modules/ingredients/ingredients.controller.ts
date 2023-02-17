import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IReq } from 'src/@types/req';
import { CreateIngredientsDto } from './dto/create-ingredients.dto';
import { IngredientsService } from './ingredients.service';

@Controller('raw-material')
@UseGuards(AuthGuard('jwt'))
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  create(@Body() createDto: CreateIngredientsDto, @Request() req: IReq) {
    return this.ingredientsService.create(req, createDto);
  }
}
