import { Test, TestingModule } from '@nestjs/testing';
import { PhotoProductService } from './photo-product.service';

describe('PhotoProductService', () => {
  let service: PhotoProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoProductService],
    }).compile();

    service = module.get<PhotoProductService>(PhotoProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
