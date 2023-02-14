import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EstablishmentControllerService } from './establishmentController.service';

@Controller('user')
export class EstablishmentController {
  constructor(private readonly userService: EstablishmentControllerService) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }
}
