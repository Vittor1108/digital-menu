import { Test, TestingModule } from '@nestjs/testing';
import { ActiveAccountController } from './active-account.controller';
import { ActiveAccountService } from './active-account.service';

describe('ActiveAccountController', () => {
  let controller: ActiveAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActiveAccountController],
      providers: [ActiveAccountService],
    }).compile();

    controller = module.get<ActiveAccountController>(ActiveAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
