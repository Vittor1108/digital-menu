import { Test, TestingModule } from '@nestjs/testing';
import { ProductRegistrationService } from './product-registration.service';

describe('ProductRegistrationService', () => {
  let service: ProductRegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductRegistrationService],
    }).compile();

    service = module.get<ProductRegistrationService>(ProductRegistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
