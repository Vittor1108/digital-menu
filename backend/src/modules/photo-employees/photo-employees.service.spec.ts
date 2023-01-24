import { Test, TestingModule } from '@nestjs/testing';
import { PhotoEmployeesService } from './photo-employees.service';

describe('PhotoEmployeesService', () => {
  let service: PhotoEmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoEmployeesService],
    }).compile();

    service = module.get<PhotoEmployeesService>(PhotoEmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
