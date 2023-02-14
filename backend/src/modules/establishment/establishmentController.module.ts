import { Module } from '@nestjs/common';
import { EstablishmentControllerService } from './establishmentController.service';
import { EstablishmentController } from './establishment.controller';
import { PrismaService } from 'src/database/PrismaService';
@Module({
  controllers: [EstablishmentController],
  providers: [EstablishmentControllerService, PrismaService],
})
export class EstablishmentModule {}
