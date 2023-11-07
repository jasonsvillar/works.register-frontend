import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ServiceService } from '../service.service';
import { Service } from '../interfaces/service';

@Component({
  selector: 'app-get-all-service',
  templateUrl: './get-all-service.component.html',
  styleUrls: ['./get-all-service.component.sass'],
})

export class GetAllServiceComponent implements OnInit {
  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0
  };

  serviceList: Service[] = [];

  displayedColumns: string[] = ['id', 'name'];
  dataSource: MatTableDataSource<Service>;

  constructor(private serviceService: ServiceService) {
    this.dataSource = new MatTableDataSource(this.serviceList);
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
  }

  ngOnInit(): void {
    this.getRowCount();
    this.getService();
  }

  getRowCount() {
    this.serviceService.getRowCount().subscribe({
      next: (rowCount: number) => {
        this.pageEvent.length = rowCount;
      },
      error: (err) => {
        console.log(err.error)
      }
    });
  }

  getService(): void {
    this.serviceService.getServices(this.pageEvent.pageIndex + 1, this.pageEvent.pageSize).subscribe({
      next: (serviceList: Service[]) => {
        this.serviceList = serviceList;
      },
      error: (err) => {
        console.log(err.error)
      }
    });
  }

  refreshData(): void {
    this.getRowCount();
    this.getService();
  }
}
