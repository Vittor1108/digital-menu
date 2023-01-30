import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IReq } from 'src/@types/req';
import { PaginationCategroyDto } from '../category/dto/pagination-category';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
import { RawMaterial } from './entities/raw-material.entity';
import { RawMaterialService } from './raw-material.service';

@Controller('raw-material')
@UseGuards(AuthGuard('jwt'))
export class RawMaterialController {
  constructor(private readonly rawMaterialService: RawMaterialService) {}

  @Post()
  create(
    @Body() createRawMaterialDto: CreateRawMaterialDto,
    @Request() req: IReq,
  ): Promise<RawMaterial> {
    return this.rawMaterialService.create(createRawMaterialDto, req);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.rawMaterialService.findById(id);
  }

  @Put(':id')
  update(
    @Body() updatedRawMaterialDto: UpdateRawMaterialDto,
    @Param('id') id: number,
  ): Promise<RawMaterial> {
    return this.rawMaterialService.update(id, updatedRawMaterialDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.rawMaterialService.delete(id);
  }

  @Get('/take=:take?/skip=:skip?/text=:text?')
  findAll(@Request() req: IReq, @Param() params: PaginationCategroyDto) {
    return this.rawMaterialService.findAll(req, params);
  }
}
