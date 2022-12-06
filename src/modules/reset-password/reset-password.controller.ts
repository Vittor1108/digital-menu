import { Body, Controller, Patch, Param } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ForgotPasswrodDto } from './dto/forgot-password.dto';
import { ResetPassworDto } from './dto/reset-password.dto';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Patch()
  forgotPassword(@Body() data: ForgotPasswrodDto): Promise<boolean> {
    return this.resetPasswordService.fogortPassword(data);
  }

  @Patch(':token')
  resetPassword(@Param('token') token: string, @Body() data: ResetPassworDto) {
    return this.resetPasswordService.resetPassword(token, data);
  }
}
