import { Component } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { ServiceService } from '../service.service';
import { Service } from '../interfaces/service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.sass']
})
export class CreateServiceComponent {
  constructor(private serviceService: ServiceService,
    public matDialogRef: MatDialogRef<CreateServiceComponent>) { }

  name: string = '';

  save(): void {
    let createService: Service = {
      name: this.name
    };

    this.serviceService.saveService(createService).subscribe({
      next: (serviceCreated: Service) => {
        this.matDialogRef.close(serviceCreated);
      }
    });
  }
}
