import {
  Controller,
  UseGuards,
  Post,
  Request,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IReq } from 'src/@types/req';
import { CreateProductRegistrationDto } from './dto/create-product-registration.dto';
import { UpdateProductRegistrationDto } from './dto/update-product-registration.dto';
import { ProductRegistration } from './entities/product-registration.entity';
import { ProductRegistrationService } from './product-registration.service';
import { PaginationCategroyDto } from '../category/dto/pagination-category';
import { IInitialFinalDate } from 'src/interfaces/IDates';
import { ISalesAccount } from './interfaces/ISalesAccount';

@Controller('product')
@UseGuards(AuthGuard('jwt'))
export class ProductRegistrationController {
  constructor(
    private readonly productRegistrationService: ProductRegistrationService,
  ) {}

  @Post()
  create(
    @Request() req: IReq,
    @Body() createDto: CreateProductRegistrationDto,
  ): Promise<ProductRegistration> {
    return this.productRegistrationService.create(createDto, req);
  }

  @Get('salesAccount/initialDate=:initialDate/finalDate=:finalDate')
  salesAccount(
    @Request() req: IReq,
    @Param() date: IInitialFinalDate,
  ): Promise<ISalesAccount> {
    return this.productRegistrationService.salesAccount(req, date);
  }

  @Get('/take=:take?/skip=:skip?/text=:text?')
  findAll(@Param() pagination: PaginationCategroyDto, @Request() req: IReq) {
    return this.productRegistrationService.findAll(pagination, req);
  }

  @Put(':id')
  update(
    @Request() req: IReq,
    @Body() updateDto: UpdateProductRegistrationDto,
    @Param('id') id: number,
  ): Promise<ProductRegistration> {
    return this.productRegistrationService.update(id, updateDto, req);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ProductRegistration> {
    return this.productRegistrationService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<boolean> {
    return this.productRegistrationService.delete(id);
  }
}
