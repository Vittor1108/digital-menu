import { Module } from '@nestjs/common';
import { PhotoUserService } from './photo-user.service';
import { PhotoUserController } from './photo-user.controller';
import { PrismaService } from 'src/database/PrismaService';
import { MulterModule } from '@nestjs/platform-express';
import { resolve } from 'path';
@Module({
  controllers: [PhotoUserController],
  providers: [PhotoUserService, PrismaService],
  imports: [
    MulterModule.register({
      dest: `${resolve()}/src/assets/uploads/images`,
    }),
  ],
})
export class PhotoUserModule {}
