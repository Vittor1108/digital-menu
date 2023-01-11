import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './guards/logged/logged.guard';
import { HomeComponent } from './pages/home/home.component';
import { ConfirmAccountComponent } from './pages/login/confirm-account/confirm-account.component';
import { CreateAccountComponent } from './pages/login/create-account/create-account.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/login/reset-password/reset-password.component';
import { SignComponent } from './pages/login/sign/sign.component';
import { AddProductComponent } from './pages/product/add-product/add-product.component';
import { CategoryComponent } from './pages/product/category/category.component';
import { EditCategoryListComponent } from './pages/product/edit-category-list/edit-category-list.component';
import { EditCategoryPageComponent } from './pages/product/edit-category-page/edit-category-page.component';
import { EditProductListComponent } from './pages/product/edit-product-list/edit-product-list.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: '',
        component: SignComponent,
      },
      {
        path: 'create-account',
        component: CreateAccountComponent,
      },
      {
        path: 'confirm-account/:id',
        component: ConfirmAccountComponent,
      },
      {
        path: 'reset-password/:id',
        component: ResetPasswordComponent,
      },
    ],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoggedGuard],
    children: [
      {
        path: 'add-product',
        component: AddProductComponent,
        canActivate: [LoggedGuard],
      },
      {
        path: 'category-product',
        component: CategoryComponent,
        canActivate: [LoggedGuard],
      },
      {
        path: 'edit-category-product',
        component: EditCategoryListComponent,
        canActivate: [LoggedGuard],
      },
      {
        path: 'updated-category-product/:id',
        component: EditCategoryPageComponent,
        canActivate: [LoggedGuard],
      },
      {
        path: 'edit-product',
        component: EditProductListComponent,
        canActivate: [LoggedGuard],
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
