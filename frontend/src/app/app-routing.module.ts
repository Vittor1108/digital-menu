import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './guards/logged/logged.guard';
import { EditEmployeeComponent } from './pages/employees/edit-employee/edit-employee.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { ListEmployeesComponent } from './pages/employees/list-employees/list-employees.component';
import { HomeComponent } from './pages/home/home.component';
import { ConfirmAccountComponent } from './pages/login/confirm-account/confirm-account.component';
import { CreateAccountComponent } from './pages/login/create-account/create-account.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/login/reset-password/reset-password.component';
import { SignComponent } from './pages/login/sign/sign.component';
import { AddProductComponent } from './pages/product/add-product/add-product.component';
import { CatalogComponent } from './pages/product/catalog/catalog.component';
import { CategoryComponent } from './pages/product/category/category.component';
import { EditCategoryListComponent } from './pages/product/edit-category-list/edit-category-list.component';
import { EditCategoryPageComponent } from './pages/product/edit-category-page/edit-category-page.component';
import { EditProductListComponent } from './pages/product/edit-product-list/edit-product-list.component';
import { EditProductPageComponent } from './pages/product/edit-product-page/edit-product-page.component';
import { RawMaterialComponent } from './pages/raw-material/raw-material.component';

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
      },
      {
        path: 'category-product',
        component: CategoryComponent,
      },
      {
        path: 'edit-category-product',
        component: EditCategoryListComponent,
      },
      {
        path: 'updated-category-product/:id',
        component: EditCategoryPageComponent,
      },
      {
        path: 'edit-product',
        component: EditProductListComponent,
      },
      {
        path: 'updated-product/:id',
        component: EditProductPageComponent,
      },
      {
        path: 'product-catalog',
        component: CatalogComponent,
      },
      {
        path: 'add-employees',
        component: EmployeesComponent,
      },
      {
        path: 'list-employees',
        component: ListEmployeesComponent,
      },
      {
        path: 'edit-employee/:id',
        component: EditEmployeeComponent,
      },
      {
        path: 'raw-material',
        component: RawMaterialComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
