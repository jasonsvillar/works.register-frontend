import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DOCUMENT } from '@angular/common';

import { ServiceService } from '../service.service';
import { Service } from '../interfaces/service';
import { GetUnusedServiceComponent } from '../get-unused-service/get-unused-service.component';
import { CreateServiceComponent } from '../create-service/create-service.component';
import { UserService } from '../interfaces/user-service';
import { AddUserServiceRequest } from '../interfaces/add-user-service-request';

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

  displayedColumns: string[] = ['check', 'id', 'name', 'actions'];
  dataSource: MatTableDataSource<Service>;

  @ViewChild(MatTable) table: MatTable<Service>;

  constructor(
    @Inject(DOCUMENT) document: Document,
    private serviceService: ServiceService,
    public dialogUnusedService: MatDialog,
    public dialogCreateService: MatDialog,
    private _snackBar: MatSnackBar
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
    const dialogAllService = this.dialogUnusedService.open(GetUnusedServiceComponent, {
      width: '90%', height: '70%',
      data: 'String Data',
    });
    dialogAllService.afterClosed().subscribe((res) => {
      if (res === 'showCreateServiceDialog') {
        const dialogCreateService = this.dialogCreateService.open(CreateServiceComponent, {
          data: 'String Data',
          panelClass: ['w-3/4', 'sm:w-80', 'h-80']
        });
        dialogCreateService.afterClosed().subscribe(
          (newService) => {
            if (newService) {
              this.serviceList.push(newService);
              this.pageEvent.length++;
              this.table.renderRows();
              this.openSnackBar('Service created and added', 'Ok');
            }
          }
        );
      } else {
        if (res) {
          let addUserServiceRequest: AddUserServiceRequest = res;
          this.serviceService.saveUserService(addUserServiceRequest).subscribe({
            next: (userService: UserService) => {
              let selectedService: Service = {
                id: userService.serviceDTO.id,
                name: userService.serviceDTO.name
              };

              if (this.serviceList === null) {
                this.serviceList = [];
              }

              this.serviceList.push(selectedService);
              this.pageEvent.length++;
              this.table.renderRows();
              this.openSnackBar('Service "' + selectedService.name + '" added', 'Ok');
            },
            error: (err) => {
              console.log(err.error)
            }
          });
        }
      }
    });
  }

  deleteUserService(event): void {
    let target = event.target || event.srcElement || event.currentTarget;
    target = target.parentElement;
    let serviceId: number = target.id;
    let serviceName: number = target.name;

    let indexToRemove = this.serviceList.findIndex(service => {
      return service.id == serviceId;
    });

    if (indexToRemove >= 0) {
      target.disabled = true;
      this.serviceService.deleteUserService(serviceId).subscribe({
        next: (deleted: boolean) => {
          if (deleted) {
            this.serviceList.splice(indexToRemove, 1);
            this.pageEvent.length--;
            this.table.renderRows();
            this.openSnackBar('Service "' + serviceName + '" deleted', 'Ok');
          }
        },
        error: (err) => {
          target.disabled = false;
          console.log(err.error)
        }
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  rowClick(row: any) {
    let check = document.getElementById('check-' + row.id + '-input');
    check.click();
  }

  arrayChecked: number[] = [];
  onCheckboxChange(event: any) {
    let serviceId = event.target.value;
    if (event.target.checked) {
      this.arrayChecked.push(serviceId);
    } else {
      let indexOfId = this.arrayChecked.indexOf(serviceId);
      this.arrayChecked.splice(indexOfId, 1);
    }
  }

  removeSelectedService(event: any) {
    this.serviceService.bulkDeleteUserService(this.arrayChecked).subscribe({
      next: (userServiceArray: UserService[]) => {
        userServiceArray.forEach(
          (userService) => {
            let indexToRemove = this.serviceList.findIndex(service => {
              return service.id == userService.serviceDTO.id;
            });
        
            if (indexToRemove >= 0) {
              this.serviceList.splice(indexToRemove, 1);
              this.pageEvent.length--;
            }
          }
        );

        this.table.renderRows();
        this.arrayChecked = [];
        this.openSnackBar('User Services deleted', 'Ok');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
