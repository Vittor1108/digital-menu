import { Module } from '@nestjs/common';
import { ActiveAccountModule } from './modules/active-account/active-account.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { HomeAuthModule } from './modules/home-auth/home-auth.module';
import { PhotoCategoryModule } from './modules/photo-category/photo-category.module';
import { PhotoProductModule } from './modules/photo-product/photo-product.module';
import { PhotoUserModule } from './modules/photo-user/photo-user.module';
import { ProductRegistrationModule } from './modules/product/product-registration.module';
import { ResetPasswordModule } from './modules/reset-password/reset-password.module';
import { UserModule } from './modules/user/user.module';
import { PhotoEmployeesModule } from './modules/photo-employees/photo-employees.module';
import { ScreensModule } from './modules/screens/screens.module';

@Module({
  imports: [
    UserModule,
    ActiveAccountModule,
    ResetPasswordModule,
    AuthModule,
    PhotoUserModule,
    ProductRegistrationModule,
    CategoryModule,
    PhotoCategoryModule,
    PhotoProductModule,
    EmployeesModule,
    HomeAuthModule,
    PhotoEmployeesModule,
    ScreensModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
