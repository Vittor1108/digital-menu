import { Module } from '@nestjs/common';
import { CustomerOrderService } from './customer-order.service';
import { CustomerOrderController } from './customer-order.controller';

@Module({
  controllers: [CustomerOrderController],
  providers: [CustomerOrderService]
})
export class CustomerOrderModule {}
