import { Test, TestingModule } from '@nestjs/testing';
import { PhotoEmployeesController } from './photo-employees.controller';
import { PhotoEmployeesService } from './photo-employees.service';

describe('PhotoEmployeesController', () => {
  let controller: PhotoEmployeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoEmployeesController],
      providers: [PhotoEmployeesService],
    }).compile();

    controller = module.get<PhotoEmployeesController>(PhotoEmployeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
