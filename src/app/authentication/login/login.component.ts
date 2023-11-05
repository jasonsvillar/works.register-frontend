import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { AuthenticationService } from '../../authentication/authentication.service';
import { StorageService } from '../../authentication/storage.service';
import { Router } from '@angular/router';
import { DialogLoginFailComponent } from '../../authentication/login/dialog/dialog-login-fail/dialog-login-fail.component'
import { LoginRequest } from '../interfaces/login-request';
import { LoginResponse } from '../interfaces/login-response';
import { LoginResponseWithJwt } from '../interfaces/login-response-with-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  authentication: LoginRequest = {
    userName: '',
    password: ''
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  submitted = false;

  constructor(
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  login(): void {
    this.authenticationService.login(this.authentication).subscribe({
      next: (resp: HttpResponse<LoginResponse>) => {
        let jwt = resp.headers.get("authorization");
        let user = resp.body;

        if (user && jwt) {
          let userWithJwt: LoginResponseWithJwt = {
            id: user.id,
            name: user.name,
            email: user.email,
            autorityList: user.autorityList,
            jwt: jwt
          }

          this.storageService.saveUser(userWithJwt);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.storageService.getUser().roles;

          this.router.navigateByUrl('dashboard');
        }
      },
      error: (err) => {
        this.dialog.open(DialogLoginFailComponent, {
          data: { message: err.error },
        });
      },
    });
  }
}