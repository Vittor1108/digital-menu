import { Test, TestingModule } from '@nestjs/testing';
import { EstablishmentController } from './establishment.controller';
import { EstablishmentControllerService } from './establishmentController.service';

describe('EstablishmentController', () => {
  let controller: EstablishmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstablishmentController],
      providers: [EstablishmentControllerService],
    }).compile();

    controller = module.get<EstablishmentController>(EstablishmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
