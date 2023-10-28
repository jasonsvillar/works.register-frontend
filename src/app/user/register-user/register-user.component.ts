import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.sass']
})

export class RegisterUserComponent implements OnInit {
  user: User = {
    name: '',
    email: '',
    password: ''
  };
  submitted = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {}

  registerUser(): void {
    const userToRegister = {
      name: this.user.name,
      email: this.user.email,
      password: this.user.password
    };

    this.userService.register(userToRegister)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }


  newUser(): void {
    this.submitted = false;
    this.user = {
      name: '',
      email: '',
      password: ''
    };
  }
}
