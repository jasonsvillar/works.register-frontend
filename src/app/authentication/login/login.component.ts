import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Authentication } from '../../authentication/authentication.model';

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

  submitted = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void { }

  loginUser(): void {
    const userToLogin = {
      userName: this.authentication.userName,
      password: this.authentication.password
    };

    this.authenticationService.login(userToLogin)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => {
          console.error(e);
          this.newUser();
        }
      });
  }

  newUser(): void {
    this.submitted = false;
    this.authentication = {
      userName: '',
      password: ''
    };
  }
}
