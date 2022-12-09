import { Module } from '@nestjs/common';
import { ProductRegistrationService } from './product-registration.service';
import { ProductRegistrationController } from './product-registration.controller';

@Module({
  controllers: [ProductRegistrationController],
  providers: [ProductRegistrationService]
})
export class ProductRegistrationModule {}
