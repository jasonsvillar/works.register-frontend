import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { ServiceService } from '../service.service';

@Component({
  selector: 'app-get-all-service',
  templateUrl: './get-all-service.component.html',
  styleUrls: ['./get-all-service.component.sass']
})
export class GetAllServiceComponent implements OnInit {
  services: any;

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void { this.getService(); }

  getService(): void {
    this.serviceService.getServices().subscribe(
      (resp: HttpResponse<any>) => {
      console.log('getService');
        if (resp) {
          this.services = resp.body;
        } else {
          this.services = null;
        }
      },
      err => {
        console.log(err.error)
      }
    );
  }
}
