import { TestBed } from '@angular/core/testing';

import { PhotoCategoryService } from './photo-category.service';

describe('PhotoCategoryService', () => {
  let service: PhotoCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
