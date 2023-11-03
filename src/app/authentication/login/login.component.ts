import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Authentication } from '../../authentication/authentication.model';
import { StorageService } from '../../authentication/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  authentication: Authentication = {
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
    private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  login(): void {
    const userToLogin = {
      userName: this.authentication.userName,
      password: this.authentication.password
    };

    this.authenticationService.login(userToLogin).subscribe(
      (resp: HttpResponse<any>) => {
        let jwt = resp.headers.get("authorization");
        let user = resp.body;

        user.jwt = jwt;

        this.storageService.saveUser(user);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;

        this.router.navigateByUrl('dashboard');
      });
  }
}