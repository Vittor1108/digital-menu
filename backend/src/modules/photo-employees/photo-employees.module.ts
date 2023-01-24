import { Module } from '@nestjs/common';
import { PhotoEmployeesService } from './photo-employees.service';
import { PhotoEmployeesController } from './photo-employees.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [PhotoEmployeesController],
  providers: [PhotoEmployeesService, PrismaService],
})
export class PhotoEmployeesModule {}
