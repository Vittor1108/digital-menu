import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoginModule } from './modules/login/login.module';

@Module({
  imports: [UserModule, AuthModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
