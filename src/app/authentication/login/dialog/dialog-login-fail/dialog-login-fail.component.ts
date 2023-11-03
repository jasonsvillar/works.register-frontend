import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-login-fail',
  templateUrl: './dialog-login-fail.component.html',
  styleUrls: ['./dialog-login-fail.component.sass']
})
export class DialogLoginFailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) { }
}
