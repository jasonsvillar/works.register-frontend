import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserNotValidatedService } from '../user-not-validated.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-validate-user',
  templateUrl: './validate-user.component.html',
  styleUrls: ['./validate-user.component.sass']
})
export class ValidateUserComponent implements OnInit {
  name: string;
  email: string;
  code: string;

  submitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userNotValidatedService: UserNotValidatedService
  ) { }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.email = this.route.snapshot.paramMap.get('email');
    this.code = this.route.snapshot.paramMap.get('code');

    this.userNotValidatedService.validate(this.name, this.email, this.code)
    .subscribe({
      next: (user : User) => {
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }


}
