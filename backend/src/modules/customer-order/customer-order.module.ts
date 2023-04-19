import { Module } from '@nestjs/common';
import { CustomerOrderService } from './customer-order.service';
import { CustomerOrderController } from './customer-order.controller';
import { PrismaService } from 'src/database/PrismaService';
import { ProductRegistrationService } from '../product/product-registration.service';
import { PhotoProductService } from '../photo-product/photo-product.service';

@Module({
  controllers: [CustomerOrderController],
  providers: [
    CustomerOrderService,
    PrismaService,
    ProductRegistrationService,
    PhotoProductService,
  ],
})
export class CustomerOrderModule {}
