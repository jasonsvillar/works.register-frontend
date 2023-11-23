import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterUserComponent } from './user/register-user/register-user.component';
import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { authGuard } from './authentication/auth.guard';
import { GetUserServiceComponent } from './service/get-user-service/get-user-service.component';
import { ValidateUserComponent } from './user/validate-user/validate-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'user/register', component: RegisterUserComponent },
  { path: 'user/validate/name/:name/email/:email/code/:code', component: ValidateUserComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'services', component: GetUserServiceComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
