import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { ServiceService } from '../service.service';
import { Service } from '../interfaces/service';
import { GetAllServiceComponent } from '../get-all-service/get-all-service.component';

@Component({
  selector: 'app-get-user-service',
  templateUrl: './get-user-service.component.html',
  styleUrls: ['./get-user-service.component.sass'],
})

export class GetUserServiceComponent implements OnInit {
  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0
  };

  serviceList: Service[] = [];

  displayedColumns: string[] = ['id', 'name'];
  dataSource: MatTableDataSource<Service>;

  serviceIdToAdd: number = 0;

  constructor(
    private serviceService: ServiceService,
    public dialog: MatDialog
    ) {
    this.dataSource = new MatTableDataSource(this.serviceList);
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
  }

  ngOnInit(): void {
    this.getUserServiceRowCount();
    this.getUserServices();
  }

  getUserServiceRowCount() {
    this.serviceService.getUserServicesRowCount().subscribe({
      next: (rowCount: number) => {
        this.pageEvent.length = rowCount;
      },
      error: (err) => {
        console.log(err.error)
      }
    });
  }

  getUserServices(): void {
    this.serviceService.getUserServices(this.pageEvent.pageIndex + 1, this.pageEvent.pageSize).subscribe({
      next: (serviceList: Service[]) => {
        this.serviceList = serviceList;
      },
      error: (err) => {
        console.log(err.error)
      }
    });
  }

  refreshData(): void {
    this.getUserServiceRowCount();
    this.getUserServices();
  }

  showAllService() {
    const dialogAllService = this.dialog.open(GetAllServiceComponent, {
      width: '90%', height: '70%',
      data: 'String Data',
    });
    dialogAllService.afterClosed().subscribe((res) => {
      if (res === 'showCreateServiceDialog') {
        console.log("Open CreateServiceDialog");
        //
      } else {
        this.serviceIdToAdd = res;
        //Add service to user service
        //Add row to table
      }
    });
  }
}
