import { Test, TestingModule } from '@nestjs/testing';
import { ProductRegistrationController } from './product-registration.controller';
import { ProductRegistrationService } from './product-registration.service';

describe('ProductRegistrationController', () => {
  let controller: ProductRegistrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductRegistrationController],
      providers: [ProductRegistrationService],
    }).compile();

    controller = module.get<ProductRegistrationController>(ProductRegistrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
