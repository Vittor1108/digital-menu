import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IReq } from 'src/@types/req';
import { CustomerOrderService } from './customer-order.service';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';
import { CustomerOrder } from './entities/customer-order.entity';

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
}
