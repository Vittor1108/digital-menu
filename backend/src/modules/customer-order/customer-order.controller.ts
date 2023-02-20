import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IReq } from 'src/@types/req';
import { CustomerOrderService } from './customer-order.service';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';
import { Request } from '@nestjs/common';
@UseGuards(AuthGuard('jwt'))
@Controller('customer-order')
export class CustomerOrderController {
  constructor(private readonly customerOrderService: CustomerOrderService) {}

  @Post()
  create(
    @Body() createCustomerOrderDto: CreateCustomerOrderDto,
    @Request() req: IReq,
  ) {
    return this.customerOrderService.create(createCustomerOrderDto, req);
  }
}
