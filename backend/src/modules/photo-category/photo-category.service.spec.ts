import { Test, TestingModule } from '@nestjs/testing';
import { PhotoCategoryService } from './photo-category.service';

describe('PhotoCategoryService', () => {
  let service: PhotoCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoCategoryService],
    }).compile();

    service = module.get<PhotoCategoryService>(PhotoCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
