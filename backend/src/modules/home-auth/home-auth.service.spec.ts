import { Test, TestingModule } from '@nestjs/testing';
import { HomeAuthService } from './home-auth.service';

describe('HomeAuthService', () => {
  let service: HomeAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeAuthService],
    }).compile();

    service = module.get<HomeAuthService>(HomeAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
