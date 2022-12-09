import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ActiveAccountModule } from './modules/active-account/active-account.module';
import { ResetPasswordModule } from './modules/reset-password/reset-password.module';
import { AuthModule } from './modules/auth/auth.module';
import { PhotoUserModule } from './modules/photo-user/photo-user.module';
import { ProductRegistrationModule } from './modules/product/product-registration.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    UserModule,
    ActiveAccountModule,
    ResetPasswordModule,
    AuthModule,
    PhotoUserModule,
    ProductRegistrationModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
