import { Module } from '@nestjs/common';
import { ScreensService } from './screens.service';
import { ScreensController } from './screens.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ScreensController],
  providers: [ScreensService, PrismaService],
})
export class ScreensModule {}
