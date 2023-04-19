import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IReq } from 'src/@types/req';
import { AuthService } from './auth.service';
import { IInfoUser } from './interfaces/IAuth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  create(@Req() req: IReq) {
    return this.authService.login(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  infoUser(@Req() req: IReq): Promise<IInfoUser> {
    return this.authService.infoUser(req);
  }
}
