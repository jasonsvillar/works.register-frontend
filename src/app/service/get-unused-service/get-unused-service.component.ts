import { Component, OnInit, Inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { ServiceService } from '../service.service';
import { Service } from '../interfaces/service';
import { AddUserServiceRequest } from '../interfaces/add-user-service-request';

@Component({
  selector: 'app-get-unused-service',
  templateUrl: './get-unused-service.component.html',
  styleUrls: ['./get-unused-service.component.sass']
})
export class GetUnusedServiceComponent implements OnInit {
  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0
  };

  serviceList: Service[] = [];

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<Service>;

  constructor(private serviceService: ServiceService,
    public matDialogRef: MatDialogRef<GetUnusedServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    this.dataSource = new MatTableDataSource(this.serviceList);
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
  }

  ngOnInit(): void {
    this.getAllUnusedServiceRowCountForCurrentUser();
    this.getAllUnusedServicesForCurrentUser();
  }

  getAllUnusedServiceRowCountForCurrentUser() {
    this.serviceService.getAllUnusedServicesRowCountForCurrentUser().subscribe({
      next: (rowCount: number) => {
        this.pageEvent.length = rowCount;
      },
      error: (err) => {
        console.log(err.error)
      }
    });
  }

  getAllUnusedServicesForCurrentUser(): void {
    this.serviceService.getAllUnusedServicesForCurrentUser(this.pageEvent.pageIndex + 1, this.pageEvent.pageSize).subscribe({
      next: (serviceList: Service[]) => {
        this.serviceList = serviceList;
      },
      error: (err) => {
        console.log(err.error)
      }
    });
  }

  refreshData(): void {
    this.getAllUnusedServiceRowCountForCurrentUser();
    this.getAllUnusedServicesForCurrentUser();
  }

  selectService(id: number): void {
    let serviceToAdd: AddUserServiceRequest = {
      serviceId: id
    };
    this.matDialogRef.close(serviceToAdd);
  }

  showCreateServiceDialog() {
    this.matDialogRef.close('showCreateServiceDialog');
  }

}
