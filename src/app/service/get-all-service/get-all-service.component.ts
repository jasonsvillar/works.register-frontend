import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { ServiceService } from '../service.service';
import { ServiceResponse } from '../interfaces/service-response';

@Component({
  selector: 'app-get-all-service',
  templateUrl: './get-all-service.component.html',
  styleUrls: ['./get-all-service.component.sass']
})
export class GetAllServiceComponent implements OnInit {
  serviceList: ServiceResponse[] = [];
  displayedColumns: string[] = ['id', 'name'];

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void { this.getService(); }

  getService(): void {
    this.serviceService.getServices().subscribe({
      next: (serviceList: ServiceResponse[]) => {
        this.serviceList = serviceList;
      },
      error: (err) => {
        console.log(err.error)
      }
  });
  }
}
