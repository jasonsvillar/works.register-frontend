import { Component } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

import { ServiceService } from '../service.service';

@Component({
  selector: 'app-filter-service',
  templateUrl: './filter-service.component.html',
  styleUrls: ['./filter-service.component.sass']
})
export class FilterServiceComponent {
  constructor(
    private serviceService: ServiceService,
    public matDialogRef: MatDialogRef<FilterServiceComponent>,
    private _snackBar: MatSnackBar
  ) {}

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
