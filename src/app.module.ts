import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ActiveAccountModule } from './modules/active-account/active-account.module';
import { ResetPasswordModule } from './modules/reset-password/reset-password.module';

@Module({
  imports: [UserModule, ActiveAccountModule, ResetPasswordModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
