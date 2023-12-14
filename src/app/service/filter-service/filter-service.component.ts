import { Component, Inject } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-service',
  templateUrl: './filter-service.component.html',
  styleUrls: ['./filter-service.component.sass']
})
export class FilterServiceComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id?: string; name?: string},
    public matDialogRef: MatDialogRef<FilterServiceComponent>
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
