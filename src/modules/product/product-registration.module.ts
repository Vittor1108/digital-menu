import { Module } from '@nestjs/common';
import { ProductRegistrationService } from './product-registration.service';
import { ProductRegistrationController } from './product-registration.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ProductRegistrationController],
  providers: [ProductRegistrationService, PrismaService],
})
export class ProductRegistrationModule {}
