import { Module } from '@nestjs/common';
import { RawMaterialService } from './raw-material.service';
import { RawMaterialController } from './raw-material.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [RawMaterialController],
  providers: [RawMaterialService, PrismaService],
})
export class RawMaterialModule {}
