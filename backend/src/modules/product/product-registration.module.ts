import { Module } from '@nestjs/common';
import { ProductRegistrationService } from './product-registration.service';
import { ProductRegistrationController } from './product-registration.controller';
import { PrismaService } from 'src/database/PrismaService';
import { PhotoProductService } from '../photo-product/photo-product.service';

@Module({
  controllers: [ProductRegistrationController],
  providers: [ProductRegistrationService, PrismaService, PhotoProductService],
})
export class ProductRegistrationModule {}
