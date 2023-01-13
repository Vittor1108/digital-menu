import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DialogForgotPasswordComponent } from './components/dialog-forgot-password/dialog-forgot-password.component';
import { CreateAccountComponent } from './pages/login/create-account/create-account.component';
import { SignComponent } from './pages/login/sign/sign.component';
import { HomeComponent } from './pages/home/home.component';
import { HTTPListener, HTTPStatus } from './service/loader/loader.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DialogCreatAccountComponent } from './components/dialog-creat-account/dialog-creat-account.component';
import { ConfirmAccountComponent } from './pages/login/confirm-account/confirm-account.component';
import { ResetPasswordComponent } from './pages/login/reset-password/reset-password.component';
import { DialogConfirmResetPasswordComponent } from './components/dialog-confirm-reset-password/dialog-confirm-reset-password.component';
import { AddProductComponent } from './pages/product/add-product/add-product.component';
import { LoggedGuard } from './guards/logged/logged.guard';
import { CategoryComponent } from './pages/product/category/category.component';
import { SnackSucessComponent } from './components/snacksbars/snack-sucess/snack-sucess.component';
import { SnackErrorComponent } from './components/snacksbars/snack-error/snack-error.component';
import { SnackAtetionComponent } from './components/snacksbars/snack-atetion/snack-atetion.component';
import { EditCategoryListComponent } from './pages/product/edit-category-list/edit-category-list.component';
import { EditCategoryPageComponent } from './pages/product/edit-category-page/edit-category-page.component';
import { EditProductListComponent } from './pages/product/edit-product-list/edit-product-list.component';
import { EditProductPageComponent } from './pages/product/edit-product-page/edit-product-page.component';
import { CatalogComponent } from './pages/product/catalog/catalog.component';

const RXJS_Services = [HTTPListener, HTTPStatus];
export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DialogForgotPasswordComponent,
    CreateAccountComponent,
    SignComponent,
    HomeComponent,
    DialogCreatAccountComponent,
    ConfirmAccountComponent,
    ResetPasswordComponent,
    DialogConfirmResetPasswordComponent,
    AddProductComponent,
    CategoryComponent,
    SnackSucessComponent,
    SnackErrorComponent,
    SnackAtetionComponent,
    EditCategoryListComponent,
    EditCategoryPageComponent,
    EditProductListComponent,
    EditProductPageComponent,
    CatalogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    ...RXJS_Services,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPListener,
      multi: true,
    },
    LoggedGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
