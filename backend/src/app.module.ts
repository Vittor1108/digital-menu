import { Module } from '@nestjs/common';
import { ActiveAccountModule } from './modules/active-account/active-account.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { HomeAuthModule } from './modules/home-auth/home-auth.module';
import { PhotoCategoryModule } from './modules/photo-category/photo-category.module';
import { PhotoProductModule } from './modules/photo-product/photo-product.module';
import { ProductRegistrationModule } from './modules/product/product-registration.module';
import { ResetPasswordModule } from './modules/reset-password/reset-password.module';
import { EstablishmentModule } from './modules/establishment/EstablishmentController.module';
import { PhotoEmployeesModule } from './modules/photo-employees/photo-employees.module';
import { ScreensModule } from './modules/screens/screens.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { IngredientslModule } from './modules/ingredients/ingredients.module';

@Module({
  imports: [
    EstablishmentModule,
    ActiveAccountModule,
    ResetPasswordModule,
    AuthModule,
    ProductRegistrationModule,
    CategoryModule,
    PhotoCategoryModule,
    PhotoProductModule,
    HomeAuthModule,
    PhotoEmployeesModule,
    ScreensModule,
    EmployeesModule,
    IngredientslModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
