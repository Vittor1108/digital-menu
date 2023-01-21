import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IReq } from 'src/@types/req';
import { HomeAuthService } from './home-auth.service';

@Controller('home-auth')
@UseGuards(AuthGuard('jwt'))
export class HomeAuthController {
  constructor(private readonly homeAuthService: HomeAuthService) {}

  @Get()
  findUser(@Request() req: IReq) {
    return this.homeAuthService.findUser(req);
  }
}
