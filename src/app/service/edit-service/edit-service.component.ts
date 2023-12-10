import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ServiceService } from '../service.service';
import { Service } from '../interfaces/service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.sass']
})
export class EditServiceComponent {
  service: Service;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Service,
    private serviceService: ServiceService,
    public matDialogRef: MatDialogRef<EditServiceComponent>,
    private _snackBar: MatSnackBar
  ) {
    this.service = data;
  }

  save(): void {
    this.serviceService.editUserService(this.service).subscribe({
      next: (serviceEdited: Service) => {
        this.matDialogRef.close(serviceEdited);
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open(err.error, "Error");
      }
    });
  }
}
