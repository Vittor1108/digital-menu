import { Test, TestingModule } from '@nestjs/testing';
import { EstablishmentControllerService } from './establishmentController.service';

describe('EstablishmentControllerService', () => {
  let service: EstablishmentControllerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstablishmentControllerService],
    }).compile();

    service = module.get<EstablishmentControllerService>(
      EstablishmentControllerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
