import { Test, TestingModule } from '@nestjs/testing';
import { PhotoProductController } from './photo-product.controller';
import { PhotoProductService } from './photo-product.service';

describe('PhotoProductController', () => {
  let controller: PhotoProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoProductController],
      providers: [PhotoProductService],
    }).compile();

    controller = module.get<PhotoProductController>(PhotoProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
