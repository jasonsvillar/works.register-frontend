import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ClientService } from '../client.service';
import { Client } from '../interfaces/client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.sass']
})
export class EditClientComponent {
  client: Client;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private clientService: ClientService,
    public matDialogRef: MatDialogRef<EditClientComponent>,
    private _snackBar: MatSnackBar
  ) {
    this.client = data;
  }

  save(): void {
    this.clientService.editUserClient(this.client).subscribe({
      next: (clientEdited: Client) => {
        this.matDialogRef.close(clientEdited);
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open(err.error, "Error");
      }
    });
  }
}
