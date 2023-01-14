import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductRegistrationDto } from './dto/create-product-registration.dto';
import { PaginationProductRegistrationDto } from './dto/pagination-product-registration.dto';
import { UpdateProductRegistrationDto } from './dto/update-product-registration.dto';
import {
  allProducts,
  ProductRegistration,
} from './entities/product-registration.entity';
import { ProductRegistrationService } from './product-registration.service';

@Controller('product')
@UseGuards(AuthGuard('jwt'))
export class ProductRegistrationController {
  constructor(
    private readonly productRegistrationService: ProductRegistrationService,
  ) {}

  @Post()
  create(
    @Body() createProductRegistrationDto: CreateProductRegistrationDto,
    @Request() req: any,
  ): Promise<ProductRegistration> {
    return this.productRegistrationService.create(
      createProductRegistrationDto,
      req,
    );
  }

  @Put(':id')
  updated(
    @Body() updateProductRegistrationDto: UpdateProductRegistrationDto,
    @Param('id') id: number,
    @Request() req: any,
  ): Promise<ProductRegistration> {
    return this.productRegistrationService.updated(
      updateProductRegistrationDto,
      id,
      req,
    );
  }

  @Get('/take=:take?/skip=:skip?/text=:text?')
  findAll(
    @Request() req: any,
    @Param() params: PaginationProductRegistrationDto,
  ): Promise<allProducts> {
    return this.productRegistrationService.findAll(req, params);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ProductRegistration> {
    return this.productRegistrationService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Request() req: any): Promise<boolean> {
    return this.productRegistrationService.delete(id, req);
  }
}
