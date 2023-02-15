import { Body, Controller, Post } from '@nestjs/common';
import { EstablishmentDto } from './dto/create-establishment.dto';
import { EstablishmentControllerService } from './establishmentController.service';

@Controller('user')
export class EstablishmentController {
  constructor(private readonly userService: EstablishmentControllerService) {}

  @Post()
  create(@Body() data: EstablishmentDto) {
    return this.userService.create(data);
  }
}
