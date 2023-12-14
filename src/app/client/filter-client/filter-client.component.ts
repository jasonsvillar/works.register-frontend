import { Component, Inject } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-client',
  templateUrl: './filter-client.component.html',
  styleUrls: ['./filter-client.component.sass']
})
export class FilterClientComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id?: string; name?: string; surname?: string; identificationNumber?: string},
    public matDialogRef: MatDialogRef<FilterClientComponent>
  ) {
    this.id = data.id;
    this.name = data.name;
    this.surname = data.surname;
    this.identificationNumber = data.identificationNumber;
  }

  id: string;
  name: string;
  surname: string;
  identificationNumber: string;

  sendFilter(): void {
    let data: string[] = [];

    if (this.name != null) {
      data['name'] = this.name;
    }

    if (!isNaN(+this.id)) {
      data['id'] = this.id;
    }

    if (this.surname != null) {
      data['surname'] = this.surname;
    }

    if (this.identificationNumber != null) {
      data['identificationNumber'] = this.identificationNumber;
    }

    this.matDialogRef.close(data);
  }
}
