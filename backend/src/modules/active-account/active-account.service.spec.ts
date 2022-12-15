import { Test, TestingModule } from '@nestjs/testing';
import { ActiveAccountService } from './active-account.service';

describe('ActiveAccountService', () => {
  let service: ActiveAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActiveAccountService],
    }).compile();

    service = module.get<ActiveAccountService>(ActiveAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
