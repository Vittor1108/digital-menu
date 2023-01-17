import { Module } from '@nestjs/common';
import { ActiveAccountModule } from './modules/active-account/active-account.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { PhotoCategoryModule } from './modules/photo-category/photo-category.module';
import { PhotoProductModule } from './modules/photo-product/photo-product.module';
import { PhotoUserModule } from './modules/photo-user/photo-user.module';
import { ProductRegistrationModule } from './modules/product/product-registration.module';
import { ResetPasswordModule } from './modules/reset-password/reset-password.module';
import { UserModule } from './modules/user/user.module';
import { EmployeesModule } from './modules/employees/employees.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
