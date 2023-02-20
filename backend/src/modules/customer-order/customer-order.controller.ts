import { Body, Controller, Post, UseGuards, Delete, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IReq } from 'src/@types/req';
import { CustomerOrderService } from './customer-order.service';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';
import { Request, Param, Get } from '@nestjs/common';
import { CustomerOrder } from './entities/customer-order.entity';
import { UpdateCustomerOrderDto } from './dto/update-customer-order.dto';
@UseGuards(AuthGuard('jwt'))
@Controller('customer-order')
export class CustomerOrderController {
  constructor(private readonly customerOrderService: CustomerOrderService) {}

  @Post()
  create(
    @Body() createCustomerOrderDto: CreateCustomerOrderDto,
    @Request() req: IReq,
  ): Promise<CustomerOrder> {
    return this.customerOrderService.create(createCustomerOrderDto, req);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<CustomerOrder> {
    return this.customerOrderService.findOne(id);
  }

  @Get()
  findAll(@Request() req: IReq) {
    return this.customerOrderService.findAll(req);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.customerOrderService.delete(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Request() req: IReq,
    @Body() updateDto: UpdateCustomerOrderDto,
  ) {
    return this.customerOrderService.update(id, updateDto, req);
  }
}
