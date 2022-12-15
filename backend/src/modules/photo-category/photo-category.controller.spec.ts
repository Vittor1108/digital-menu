import { Test, TestingModule } from '@nestjs/testing';
import { PhotoCategoryController } from './photo-category.controller';
import { PhotoCategoryService } from './photo-category.service';

describe('PhotoCategoryController', () => {
  let controller: PhotoCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoCategoryController],
      providers: [PhotoCategoryService],
    }).compile();

    controller = module.get<PhotoCategoryController>(PhotoCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
