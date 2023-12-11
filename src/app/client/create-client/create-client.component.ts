import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

import { ClientService } from '../client.service';
import { Client } from '../interfaces/client';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.sass']
})
export class CreateClientComponent {
  constructor(
    private clientService: ClientService,
    public matDialogRef: MatDialogRef<CreateClientComponent>,
    private _snackBar: MatSnackBar
  ) {}

  name: string = '';
  surname: string = '';
  identificationNumber: string = '';

  save(): void {
    let createClient: Client = {
      name: this.name,
      surname: this.surname,
      identificationNumber: this.identificationNumber
    };

    this.clientService.saveUserClient(createClient).subscribe({
      next: (clientCreated: Client) => {
        this.matDialogRef.close(clientCreated);
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open(err.error, "Error");
      }
    });
  }
}
