import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { Screen } from './entities/screen.entity';
@Injectable()
export class ScreensService {
  constructor(private readonly prismaService: PrismaService) {}

  public findAll = async (): Promise<Screen[]> => {
    const screens = await this.prismaService.screens.findMany();
    return screens;
  };
}
