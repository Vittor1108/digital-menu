import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

//DTO
import { ForgotPassword } from './dto/forgotPassword.dto';
import { ResetPassword } from './dto/resetPassword.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Patch(':token')
  public async activeAccount(@Param('token') token: string): Promise<string> {
    return this.authService.confirmAccount(token);
  }

  @Patch()
  public async forgotPassword(@Body() data: ForgotPassword): Promise<string> {
    return this.authService.forgotPassword(data);
  }

  @Post(':token')
  public async resetPassword(
    @Body() data: ResetPassword,
    @Param('token') token: string,
  ): Promise<string> {
    return this.authService.resetPassword(data, token);
  }
}
