import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterUserComponent } from './user/register-user/register-user.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  { path: 'user/register', component: RegisterUserComponent },
  { path: 'user/login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
