import { Component, OnInit, Inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { ServiceService } from '../service.service';
import { Service } from '../interfaces/service';

@Component({
  selector: 'app-get-all-service',
  templateUrl: './get-all-service.component.html',
  styleUrls: ['./get-all-service.component.sass']
})
export class GetAllServiceComponent implements OnInit {
  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0
  };

  serviceList: Service[] = [];

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<Service>;

  constructor(private serviceService: ServiceService,
    public matDialogRef: MatDialogRef<GetAllServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    this.dataSource = new MatTableDataSource(this.serviceList);
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
  }

  ngOnInit(): void {
    this.getAllFreeServiceRowCountForCurrentUser();
    this.getAllFreeServicesForCurrentUser();
  }

  getAllFreeServiceRowCountForCurrentUser() {
    this.serviceService.getAllFreeServicesRowCountForCurrentUser().subscribe({
      next: (rowCount: number) => {
        this.pageEvent.length = rowCount;
      },
      error: (err) => {
        console.log(err.error)
      }
    });
  }

  getAllFreeServicesForCurrentUser(): void {
    this.serviceService.getAllFreeServicesForCurrentUser(this.pageEvent.pageIndex + 1, this.pageEvent.pageSize).subscribe({
      next: (serviceList: Service[]) => {
        this.serviceList = serviceList;
      },
      error: (err) => {
        console.log(err.error)
      }
    });
  }

  refreshData(): void {
    this.getAllFreeServiceRowCountForCurrentUser();
    this.getAllFreeServicesForCurrentUser();
  }

  selectService(id: number): void {
    this.matDialogRef.close(id);
  }

  showCreateServiceDialog() {
    this.matDialogRef.close('showCreateServiceDialog');
  }

}
