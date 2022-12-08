import { Test, TestingModule } from '@nestjs/testing';
import { PhotoUserService } from './photo-user.service';

describe('PhotoUserService', () => {
  let service: PhotoUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoUserService],
    }).compile();

    service = module.get<PhotoUserService>(PhotoUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
