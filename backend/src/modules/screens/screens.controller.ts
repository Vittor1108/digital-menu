import { Controller, Get } from '@nestjs/common';
import { Screen } from './entities/screen.entity';
import { ScreensService } from './screens.service';

@Controller('screens')
export class ScreensController {
  constructor(private readonly screensService: ScreensService) {}

  @Get()
  findAll(): Promise<Screen[]> {
    return this.screensService.findAll();
  }
}
