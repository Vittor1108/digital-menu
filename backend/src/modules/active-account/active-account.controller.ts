import { Controller, Param, Patch } from '@nestjs/common';
import { ActiveAccountService } from './active-account.service';

@Controller('active-account')
export class ActiveAccountController {
  constructor(private readonly activeAccountService: ActiveAccountService) {}

  @Patch(':token')
  checkTokenActiveAccount(@Param('token') token: string): Promise<boolean> {
    return this.activeAccountService.checkTokenActiveAccount(token);
  }
}
