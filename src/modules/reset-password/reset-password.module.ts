import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';
import { PrismaService } from 'src/database/PrismaService';
@Module({
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService, PrismaService],
})
export class ResetPasswordModule {}
