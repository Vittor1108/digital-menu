import { Controller, Post, Req, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IReq } from 'src/@types/req';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  create(@Req() req: IReq) {
    return this.authService.login(req);
  }

  @Get()
  validateToken(@Req() req: IReq) {
    return this.authService.validateToken(req);
  }
}
