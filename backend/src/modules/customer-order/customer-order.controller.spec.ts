import { Test, TestingModule } from '@nestjs/testing';
import { CustomerOrderController } from './customer-order.controller';
import { CustomerOrderService } from './customer-order.service';

describe('CustomerOrderController', () => {
  let controller: CustomerOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerOrderController],
      providers: [CustomerOrderService],
    }).compile();

    controller = module.get<CustomerOrderController>(CustomerOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
