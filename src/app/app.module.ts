import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './user/register-user/register-user.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './authentication/login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';

import { httpInterceptorProviders } from './helpers/http.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { HeaderComponent } from './home/header/header.component';
import { DialogLoginFailComponent } from './authentication/login/dialog/dialog-login-fail/dialog-login-fail.component';
import { GetUserServiceComponent } from './service/get-user-service/get-user-service.component';
import { CreateServiceComponent } from './service/create-service/create-service.component';
import { ValidateUserComponent } from './user/validate-user/validate-user.component';
import { FilterServiceComponent } from './service/filter-service/filter-service.component';
import { EditServiceComponent } from './service/edit-service/edit-service.component';
import { GetUserClientComponent } from './client/get-user-client/get-user-client.component';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { FilterClientComponent } from './client/filter-client/filter-client.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    DialogLoginFailComponent,
    GetUserServiceComponent,
    CreateServiceComponent,
    ValidateUserComponent,
    FilterServiceComponent,
    EditServiceComponent,
    GetUserClientComponent,
    CreateClientComponent,
    FilterClientComponent,
    EditClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSortModule
  ],
  providers: [
    httpInterceptorProviders, 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
