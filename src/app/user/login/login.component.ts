import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  user: User = {
    name: '',
    password: ''
  };

  submitted = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void { }

  loginUser(): void {
    const userToLogin = {
      name: this.user.name,
      password: this.user.password
    };

    this.userService.login(userToLogin)
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
    this.user = {
      name: '',
      password: ''
    };
  }
}
