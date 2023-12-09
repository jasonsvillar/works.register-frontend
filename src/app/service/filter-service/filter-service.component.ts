import { Component, Inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ServiceService } from '../service.service';

@Component({
  selector: 'app-filter-service',
  templateUrl: './filter-service.component.html',
  styleUrls: ['./filter-service.component.sass']
})
export class FilterServiceComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id?: string; name?: string},
    private serviceService: ServiceService,
    public matDialogRef: MatDialogRef<FilterServiceComponent>,
    private _snackBar: MatSnackBar
  ) {
    this.id = data.id;
    this.name = data.name;
  }

  id: string;
  name: string;

  sendFilter(): void {
    let data: string[] = [];

    if (this.name != null) {
      data['name'] = this.name;
    }

    if (!isNaN(+this.id)) {
      data['id'] = this.id;
    }

    this.matDialogRef.close(data);
  }
}
