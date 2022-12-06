import { Module } from '@nestjs/common';
import { ActiveAccountService } from './active-account.service';
import { ActiveAccountController } from './active-account.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ActiveAccountController],
  providers: [ActiveAccountService, PrismaService],
})
export class ActiveAccountModule {}
