import { Injectable } from '@nestjs/common';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';
import { UpdateCustomerOrderDto } from './dto/update-customer-order.dto';

@Injectable()
export class CustomerOrderService {
  create(createCustomerOrderDto: CreateCustomerOrderDto) {
    return 'This action adds a new customerOrder';
  }

  findAll() {
    return `This action returns all customerOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerOrder`;
  }

  update(id: number, updateCustomerOrderDto: UpdateCustomerOrderDto) {
    return `This action updates a #${id} customerOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerOrder`;
  }
}
