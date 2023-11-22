import { Component, OnInit } from '@angular/core';
import { UserNotValidatedService } from '../user-not-validated.service';
import { UserNotValidatedRequest } from '../interfaces/user-not-validated-request';
import { UserNotValidatedResponse } from '../interfaces/user-not-validated-response';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.sass']
})

export class RegisterUserComponent implements OnInit {
  userNotValidatedRequest: UserNotValidatedRequest = {
    name: '',
    email: '',
    password: '',
    frontendUrlForValidating: ''
  };

  submitted = false;

  constructor(private userNotValidatedService: UserNotValidatedService) { }

  ngOnInit(): void { }

  registerUser(): void {
    this.userNotValidatedRequest.frontendUrlForValidating = "http://localhost:4200/user/validate"
    + "/name/" + this.userNotValidatedRequest.name
    + "/email/" + this.userNotValidatedRequest.email
    + "/code/";

    this.userNotValidatedService.register(this.userNotValidatedRequest)
      .subscribe({
        next: (userRegisterResponse: UserNotValidatedResponse) => {
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
}
