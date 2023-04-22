import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IReq } from 'src/@types/req';
import { CustomerOrderService } from './customer-order.service';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';
import { CustomerOrder } from './entities/customer-order.entity';
import { UpdateCustomerOrderDto } from './dto/update-customer-order.dto';
import { IOrder } from './interfaces/IOrders';
import { Product } from '@prisma/client';

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

  @Get('/status=:status')
  getByStatus(
    @Request() req: IReq,
    @Param('status') status: number,
  ): Promise<CustomerOrder[]> {
    return this.customerOrderService.getByStatus(req, status);
  }

  @Get('/recent/qtd=:qtd')
  getByRecent(
    @Request() req: IReq,
    @Param('qtd') qtd: number,
  ): Promise<Product[]> {
    return this.customerOrderService.getRecentOrderes(req, qtd);
  }

  @Get('/moreOrders')
  getMoreOrders(@Request() req: IReq): Promise<IOrder[]> {
    return this.customerOrderService.moreOrders(req);
  }
  getRecentOrderes;
  @Get()
  getAll(@Request() req: IReq): Promise<CustomerOrder[]> {
    return this.customerOrderService.getAll(req);
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<CustomerOrder> {
    return this.customerOrderService.getOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateDto: UpdateCustomerOrderDto,
  ): Promise<CustomerOrder> {
    return this.customerOrderService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<boolean> {
    return this.customerOrderService.delete(id);
  }
}
