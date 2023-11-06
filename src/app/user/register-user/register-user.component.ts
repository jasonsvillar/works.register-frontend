import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserRegisterRequest } from '../interfaces/user-register-request';
import { UserRegisterResponse } from '../interfaces/user-register-response';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.sass']
})

export class RegisterUserComponent implements OnInit {
  user: UserRegisterRequest = {
    name: '',
    email: '',
    password: ''
  };

  submitted = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void { }

  registerUser(): void {
    this.userService.register(this.user)
      .subscribe({
        next: (userRegisterResponse : UserRegisterResponse) => {
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
}
