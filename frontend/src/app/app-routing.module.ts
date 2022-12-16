import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './pages/login/create-account/create-account.component';
import { LoginComponent } from './pages/login/login.component';
import { SignComponent } from './pages/login/sign/sign.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
