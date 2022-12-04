import { Controller, Post, Body } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  public async create(@Body() data: UserDto): Promise<UserDto> {
    return this.userService.create(data);
  }
}
