import { Test, TestingModule } from '@nestjs/testing';
import { PhotoUserController } from './photo-user.controller';
import { PhotoUserService } from './photo-user.service';

describe('PhotoUserController', () => {
  let controller: PhotoUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoUserController],
      providers: [PhotoUserService],
    }).compile();

    controller = module.get<PhotoUserController>(PhotoUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
