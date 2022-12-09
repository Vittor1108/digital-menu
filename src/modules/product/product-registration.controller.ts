import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductRegistrationService } from './product-registration.service';
import { CreateProductRegistrationDto } from './dto/create-product-registration.dto';
import { UpdateProductRegistrationDto } from './dto/update-product-registration.dto';

@Controller('product-registration')
export class ProductRegistrationController {
  constructor(private readonly productRegistrationService: ProductRegistrationService) {}

  @Post()
  create(@Body() createProductRegistrationDto: CreateProductRegistrationDto) {
    return this.productRegistrationService.create(createProductRegistrationDto);
  }

  @Get()
  findAll() {
    return this.productRegistrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productRegistrationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductRegistrationDto: UpdateProductRegistrationDto) {
    return this.productRegistrationService.update(+id, updateProductRegistrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productRegistrationService.remove(+id);
  }
}
