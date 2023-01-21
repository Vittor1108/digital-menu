import { Test, TestingModule } from '@nestjs/testing';
import { HomeAuthController } from './home-auth.controller';
import { HomeAuthService } from './home-auth.service';

describe('HomeAuthController', () => {
  let controller: HomeAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeAuthController],
      providers: [HomeAuthService],
    }).compile();

    controller = module.get<HomeAuthController>(HomeAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
