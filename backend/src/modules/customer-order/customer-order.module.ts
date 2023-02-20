import { Module } from '@nestjs/common';
import { CustomerOrderService } from './customer-order.service';
import { CustomerOrderController } from './customer-order.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [CustomerOrderController],
  providers: [CustomerOrderService, PrismaService],
})
export class CustomerOrderModule {}
