import { Module } from '@nestjs/common';
import { HomeAuthService } from './home-auth.service';
import { HomeAuthController } from './home-auth.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [HomeAuthController],
  providers: [HomeAuthService, PrismaService],
})
export class HomeAuthModule {}
