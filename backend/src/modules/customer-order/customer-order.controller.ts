import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerOrderService } from './customer-order.service';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';
import { UpdateCustomerOrderDto } from './dto/update-customer-order.dto';

@Controller('customer-order')
export class CustomerOrderController {
  constructor(private readonly customerOrderService: CustomerOrderService) {}

  @Post()
  create(@Body() createCustomerOrderDto: CreateCustomerOrderDto) {
    return this.customerOrderService.create(createCustomerOrderDto);
  }

  @Get()
  findAll() {
    return this.customerOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerOrderDto: UpdateCustomerOrderDto) {
    return this.customerOrderService.update(+id, updateCustomerOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerOrderService.remove(+id);
  }
}
