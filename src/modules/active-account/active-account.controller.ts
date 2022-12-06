import { Controller, Get, Param } from '@nestjs/common';
import { ActiveAccountService } from './active-account.service';

@Controller('active-account')
export class ActiveAccountController {
  constructor(private readonly activeAccountService: ActiveAccountService) {}

  @Get(':token')
  checkTokenActiveAccount(@Param('token') token: string): Promise<boolean> {
    return this.activeAccountService.checkTokenActiveAccount(token);
  }
}
